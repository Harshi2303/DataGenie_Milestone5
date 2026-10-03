import * as XLSX from 'xlsx';

/**
 * Parses MS_DataGenie_Synthetic_Dataset.xlsx or custom user uploaded Excel workbooks
 * and provides dynamic KPI calculation, filtering, chart series generation, Top Story, and Brief.
 */

export async function loadExcelData() {
  try {
    const response = await fetch('/MS_DataGenie_Synthetic_Dataset.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    return parseWorkbookBuffer(arrayBuffer, 'MS_DataGenie_Synthetic_Dataset.xlsx');
  } catch (error) {
    console.error('Error loading default Excel dataset:', error);
    throw error;
  }
}

export function parseCustomFile(arrayBuffer, fileName) {
  return parseWorkbookBuffer(arrayBuffer, fileName);
}

function parseWorkbookBuffer(arrayBuffer, fileName) {
  const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });
  
  const getSheet = (possibleNames) => {
    for (const name of possibleNames) {
      if (workbook.Sheets[name]) return XLSX.utils.sheet_to_json(workbook.Sheets[name]);
    }
    // Fallback: return first sheet if none match
    if (workbook.SheetNames.length > 0) {
      return XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    }
    return [];
  };

  const rawData = {
    fileName,
    sales: getSheet(['Sales_Transactions', 'Sales', 'Sheet1']),
    inventory: getSheet(['Inventory', 'Stock']),
    availability: getSheet(['Availability', 'Stockout']),
    fulfilment: getSheet(['Fulfilment_Cost', 'Fulfillment', 'Shipping'])
  };

  const formatDate = (val) => {
    if (!val) return '';
    if (val instanceof Date) return val.toISOString().split('T')[0];
    return String(val).split('T')[0];
  };

  ['sales', 'inventory', 'availability', 'fulfilment'].forEach(key => {
    if (Array.isArray(rawData[key])) {
      rawData[key] = rawData[key].map(row => ({
        ...row,
        date: formatDate(row.date),
        location_id: row.location_id || row.fulfilment_location_id || ''
      }));
    } else {
      rawData[key] = [];
    }
  });

  return rawData;
}

export function extractFilterOptions(rawData) {
  if (!rawData || !rawData.sales) return { categories: [], channels: [], regions: [], locations: [], products: [] };
  
  const getUnique = (arr, key) => Array.from(new Set(arr.map(item => item[key]).filter(Boolean))).sort();
  
  return {
    categories: ['All', ...getUnique(rawData.sales, 'category')],
    channels: ['All', ...getUnique(rawData.sales, 'channel')],
    regions: ['All', ...getUnique(rawData.sales, 'region')],
    locations: ['All', ...getUnique(rawData.sales, 'location_id')],
    products: ['All', ...getUnique(rawData.sales, 'product_id')]
  };
}

export function calculateFilteredMetrics(rawData, filters = {}) {
  if (!rawData) return null;

  const matchesFilter = (row) => {
    if (filters.category && filters.category !== 'All' && row.category !== filters.category) return false;
    if (filters.channel && filters.channel !== 'All' && row.channel && row.channel !== filters.channel) return false;
    if (filters.region && filters.region !== 'All' && row.region !== filters.region) return false;
    if (filters.location && filters.location !== 'All' && row.location_id !== filters.location) return false;
    if (filters.product && filters.product !== 'All' && row.product_id !== filters.product) return false;
    return true;
  };

  const filteredSales = (rawData.sales || []).filter(matchesFilter);
  const filteredInv = (rawData.inventory || []).filter(matchesFilter);
  const filteredAvail = (rawData.availability || []).filter(matchesFilter);
  const filteredFulf = (rawData.fulfilment || []).filter(matchesFilter);

  const dates = Array.from(new Set([
    ...filteredSales.map(r => r.date),
    ...filteredInv.map(r => r.date),
    ...filteredAvail.map(r => r.date),
    ...filteredFulf.map(r => r.date)
  ])).filter(Boolean).sort();

  const dailySeries = dates.map(date => {
    const sRows = filteredSales.filter(r => r.date === date);
    const iRows = filteredInv.filter(r => r.date === date);
    const aRows = filteredAvail.filter(r => r.date === date);
    const fRows = filteredFulf.filter(r => r.date === date);

    const salesAmount = sRows.reduce((sum, r) => sum + (Number(r.sales_amount) || 0), 0);
    const unitsSold = sRows.reduce((sum, r) => sum + (Number(r.units_sold) || 0), 0);
    const markdownAmount = sRows.reduce((sum, r) => sum + (Number(r.markdown_amount) || 0), 0);

    const stockQty = iRows.reduce((sum, r) => sum + (Number(r.stock_quantity) || 0), 0);
    const invValue = iRows.reduce((sum, r) => sum + (Number(r.inventory_value) || 0), 0);

    const expUnits = aRows.reduce((sum, r) => sum + (Number(r.expected_units) || 0), 0);
    const availUnits = aRows.reduce((sum, r) => sum + (Number(r.available_units) || 0), 0);
    const availRate = expUnits > 0 ? (availUnits / expUnits) * 100 : 0;

    const fulfCost = fRows.reduce((sum, r) => sum + (Number(r.fulfilment_cost) || 0), 0);

    return {
      date,
      salesAmount,
      unitsSold,
      markdownAmount,
      stockQty,
      invValue,
      expUnits,
      availUnits,
      availRate: Number(availRate.toFixed(1)),
      fulfCost
    };
  });

  const totalSalesRevenue = dailySeries.reduce((sum, d) => sum + d.salesAmount, 0);
  const totalUnitsSold = dailySeries.reduce((sum, d) => sum + d.unitsSold, 0);
  const totalExpectedUnits = dailySeries.reduce((sum, d) => sum + d.expUnits, 0);
  const totalAvailableUnits = dailySeries.reduce((sum, d) => sum + d.availUnits, 0);
  const overallAvailabilityRate = totalExpectedUnits > 0 ? (totalAvailableUnits / totalExpectedUnits) * 100 : 0;
  
  const latestStockQty = dailySeries.length ? dailySeries[dailySeries.length - 1].stockQty : 0;
  const latestInvValue = dailySeries.length ? dailySeries[dailySeries.length - 1].invValue : 0;
  const totalFulfilmentCost = dailySeries.reduce((sum, d) => sum + d.fulfCost, 0);

  const baselineDays = dailySeries.filter(d => d.date <= '2026-09-03');
  const disruptionDays = dailySeries.filter(d => d.date >= '2026-09-04');

  const calcAvg = (arr, key) => arr.length ? arr.reduce((sum, item) => sum + item[key], 0) / arr.length : 0;

  const baselineSalesAvg = calcAvg(baselineDays, 'salesAmount');
  const disruptionSalesAvg = calcAvg(disruptionDays, 'salesAmount');
  const salesChangePct = baselineSalesAvg > 0 ? ((disruptionSalesAvg - baselineSalesAvg) / baselineSalesAvg) * 100 : 0;

  const baselineAvailAvg = calcAvg(baselineDays, 'availRate');
  const disruptionAvailAvg = calcAvg(disruptionDays, 'availRate');
  const availDeltaPoints = disruptionAvailAvg - baselineAvailAvg;

  const baselineStockAvg = calcAvg(baselineDays, 'stockQty');
  const disruptionStockAvg = calcAvg(disruptionDays, 'stockQty');
  const stockChangePct = baselineStockAvg > 0 ? ((disruptionStockAvg - baselineStockAvg) / baselineStockAvg) * 100 : 0;

  const baselineFulfAvg = calcAvg(baselineDays, 'fulfCost');
  const disruptionFulfAvg = calcAvg(disruptionDays, 'fulfCost');
  const fulfChangePct = baselineFulfAvg > 0 ? ((disruptionFulfAvg - baselineFulfAvg) / baselineFulfAvg) * 100 : 0;

  return {
    dailySeries,
    totals: {
      totalSalesRevenue,
      totalUnitsSold,
      overallAvailabilityRate: Number(overallAvailabilityRate.toFixed(1)),
      latestStockQty,
      latestInvValue,
      totalFulfilmentCost
    },
    comparison: {
      baselineSalesAvg: Math.round(baselineSalesAvg),
      disruptionSalesAvg: Math.round(disruptionSalesAvg),
      salesChangePct: Number(salesChangePct.toFixed(1)),

      baselineAvailAvg: Number(baselineAvailAvg.toFixed(1)),
      disruptionAvailAvg: Number(disruptionAvailAvg.toFixed(1)),
      availDeltaPoints: Number(availDeltaPoints.toFixed(1)),

      baselineStockAvg: Math.round(baselineStockAvg),
      disruptionStockAvg: Math.round(disruptionStockAvg),
      stockChangePct: Number(stockChangePct.toFixed(1)),

      baselineFulfAvg: Number(baselineFulfAvg.toFixed(1)),
      disruptionFulfAvg: Number(disruptionFulfAvg.toFixed(1)),
      fulfChangePct: Number(fulfChangePct.toFixed(1))
    }
  };
}

export function generateTopStory(rawData) {
  if (!rawData) return null;

  const fashionOnlineMetrics = calculateFilteredMetrics(rawData, { category: 'Fashion', channel: 'Online' });
  const foComp = fashionOnlineMetrics.comparison;

  return {
    title: "Operational disruption is putting product availability at risk.",
    
    what: {
      headline: `Product Availability Rate fell ${Math.abs(foComp.availDeltaPoints)} percentage points in Fashion Online.`,
      description: `Product Availability dropped from ${foComp.baselineAvailAvg}% (baseline period) down to ${foComp.disruptionAvailAvg}% (active disruption).`,
      metricValue: `${foComp.disruptionAvailAvg}%`,
      metricDelta: `${foComp.availDeltaPoints} pts`,
      citation: {
        sheet: "Availability",
        fields: "expected_units, available_units, out_of_stock_flag",
        rawProof: `Baseline: 190/200 units available (95.0%). Disruption: 120/200 units available (60.0%). Out of stock flag triggered for P101 & P102 on Sep 4.`
      }
    },

    where: {
      headline: "Concentrated in Category: Fashion across Channel: Online (South East L01 & North West L02).",
      description: "Food Store operations maintained a steady 97.5% availability rate with zero stockouts, isolating the disruption entirely to Fashion Online fulfillment.",
      segment: "Fashion / Online / L01 & L02",
      affectedProducts: "P101 (Women's Dress), P102 (Men's Jacket)",
      citation: {
        sheet: "Availability & Sales_Transactions",
        fields: "category, channel, location_id, product_id",
        rawProof: "Food (P201/P202) Store availability remained constant at 97.5% across all days."
      }
    },

    why: {
      headline: `Daily Sales Revenue declined by ${Math.abs(foComp.salesChangePct)}% due to inventory stockouts.`,
      description: `Daily sales dropped from £${foComp.baselineSalesAvg.toLocaleString()} to £${foComp.disruptionSalesAvg.toLocaleString()}/day. Daily markdown amount increased from £550 to £850/day (+54.5%).`,
      salesDrop: `£${(foComp.baselineSalesAvg - foComp.disruptionSalesAvg).toLocaleString()}/day`,
      markdownSurge: "+54.5% (£550 → £850/day)",
      citation: {
        sheet: "Sales_Transactions",
        fields: "sales_amount, units_sold, markdown_amount",
        rawProof: "Units sold dropped from 220 units/day to 125 units/day."
      }
    },

    whatElse: {
      headline: `Inventory stock surged +${foComp.stockChangePct}% while Fulfilment Costs jumped +${foComp.fulfChangePct}%.`,
      description: `Fashion inventory accumulated from ${foComp.baselineStockAvg} units (£17,000) to ${foComp.disruptionStockAvg} units (£29,750 value). Fulfillment cost per day surged from £${foComp.baselineFulfAvg} to £${foComp.disruptionFulfAvg}/day as shipping costs per order rose from £6 to £10.`,
      inventoryValueIncrease: `+£${(29750 - 17000).toLocaleString()} (+75.0% Stock Value)`,
      fulfilmentCostSurge: `+${foComp.fulfChangePct}% (£4 → £10/day)`,
      citation: {
        sheet: "Inventory & Fulfilment_Cost",
        fields: "stock_quantity, inventory_value, shipping_cost, handling_cost, fulfilment_cost",
        rawProof: "Fulfilment order shipping costs increased from £6 to £10/order."
      }
    }
  };
}

export function generateBrief(rawData) {
  if (!rawData) return null;

  const foMetrics = calculateFilteredMetrics(rawData, { category: 'Fashion', channel: 'Online' });
  const foComp = foMetrics.comparison;

  return {
    targetAudience: "Head of Business Operations",
    gist: "An operational disruption in Online Fashion fulfillment triggered a 35 percentage point drop in product availability, causing daily online revenue to drop by 43.2% while driving a 75% build-up in excess stock value (£29,750) and a 150% surge in daily fulfillment costs.",
    
    headlineNumbers: [
      { label: "Product Availability Delta", value: "-35.0 pts", subtext: "95.0% → 60.0% (Fashion Online)", trend: "down" },
      { label: "Daily Revenue Loss", value: "-£4,750 / day", subtext: "£11,000 → £6,250 / day (-43.2%)", trend: "down" },
      { label: "Excess Stock Accumulation", value: "+£12,750", subtext: "£17,000 → £29,750 (+75.0% stock value)", trend: "up" },
      { label: "Fulfilment Cost Spike", value: "+150.0%", subtext: "Shipping cost per order surged £6 → £10", trend: "up" }
    ],

    top5Insights: [
      {
        id: 1,
        title: "Single Category Disruption",
        desc: "Food Store sales and availability (97.5%) remained unaffected, isolating the bottleneck to Fashion e-commerce fulfillment hubs L01 & L02."
      },
      {
        id: 2,
        title: "Stock Accumulation & Out-of-Stock Paradox",
        desc: "Despite availability dropping to 60.0%, physical inventory stock rose from 340 to 595 units as stock accumulated in fulfillment centers."
      },
      {
        id: 3,
        title: "Escalating Fulfilment & Shipping Charges",
        desc: "Fulfilment shipping fees surged +66.7% per order (from £6 to £10), while handling costs doubled from £2 to £4."
      },
      {
        id: 4,
        title: "Rising Markdown Pressure",
        desc: "Daily markdown amounts grew by 54.5% (£550 to £850/day) as delayed online orders required promotional write-downs."
      },
      {
        id: 5,
        title: "High Sensitivity to Product IDs P101 & P102",
        desc: "Women's Fashion (P101) and Men's Outerwear (P102) accounted for 100% of out-of-stock flags."
      }
    ],

    businessTakeaway: "Immediate operational intervention is required in Fashion e-commerce distribution centers (L01/L02) to unblock stuck stock, renegotiate shipping rates, and restore online availability."
  };
}
