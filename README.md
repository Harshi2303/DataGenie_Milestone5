# DataGenie Milestone 5: M&S Operations Analytics

A working analytics prototype built for the DataGenie Sales & Tech Associate Hackathon 2026. The prototype uses a synthetic Marks & Spencer operational dataset to demonstrate the journey from KPI analysis to connected business insights.

## Overview

The app follows the workflow:

**Company → Prospect Analysis → Pain Points → Dashboard → Top Story → Executive Brief**

- **Prospect Analysis:** Identifies key M&S operational pain points around product availability, excess inventory and uneven performance.
- **Dashboard:** Provides 4 KPIs and 4 line charts for Sales Revenue, Product Availability Rate, Inventory Level and Cost to Serve, with filters for dimensional analysis.
- **Top Story:** Connects related KPI movements and surfaces the key operational story using the same underlying data.
- **Executive Brief:** Summarizes the findings into a concise management level view.

The dashboard requires the user to inspect multiple KPI trends and dimensions to understand what is happening. The Top Story then brings these related movements together into a structured explanation, demonstrating how the same analysis can move from manual investigation to an automated business insight.

## Potential Agentic AI Automation

The workflow could be automated using agentic AI to:

1. Ingest operational data
2. Validate and clean the data
3. Calculate KPIs
4. Monitor KPI trends
5. Compare performance across dimensions
6. Detect unusual changes
7. Identify contributing dimensions
8. Connect related KPI movements
9. Generate Top Stories
10. Generate Executive Briefs
11. Provide traceable evidence
12. Monitor continuously and generate alerts or reports

## Assumptions

- The dataset is synthetic and created for this prototype; it is not M&S internal data.
- KPI definitions and data structures are based on the proposed Milestone 3 design.
- The prototype demonstrates the analytical workflow rather than M&S's actual internal systems.
- Relationships between KPI movements are treated as analytical signals rather than confirmed causal relationships.
- The prototype focuses on M&S rather than implementing a full multi-company production system.

## Tech Stack

- React
- Vite
- JavaScript
- Recharts
- XLSX

## Purpose

The prototype demonstrates how a business user can move from manually analysing multiple operational metrics to receiving a connected, traceable business story from the same underlying data.# DataGenie Milestone 5: M&S Operations Analytics

A working analytics prototype built for the DataGenie Sales & Tech Associate Hackathon 2026. The prototype uses a synthetic Marks & Spencer operational dataset to demonstrate how DataGenie can move from dashboard based analysis to connected business insights.

## What the App Does

The app follows a simple workflow:

**Company → Pain Points → Dashboard → Top Story → Executive Brief**

- **Company & Prospect Analysis:** Focuses on Marks & Spencer and identifies key operational pain points around product availability, excess inventory and uneven performance.
- **Dashboard First:** Provides 4 KPIs and 4 line charts for Sales Revenue, Product Availability Rate, Inventory Level and Cost to Serve. Filters allow the user to investigate the data across business dimensions.
- **Top Story:** Surfaces the key issue after the dashboard view and connects movements across multiple KPIs in one place.
- **Executive Brief:** Converts the detailed analysis into a concise management level summary.

## Why This Shows the "Hard Way"

The dashboard requires the user to manually inspect multiple KPI trends, apply filters and connect changes across different charts to understand what is happening.

The Top Story then shows the contrast: instead of manually searching across several charts, related KPI movements are brought together into one structured explanation with traceable source data.

## Potential Agentic AI Automation

The workflow demonstrated in the prototype could be automated through an agentic AI system:

1. Ingest operational data
2. Validate and clean the data
3. Calculate KPIs
4. Monitor KPI trends
5. Compare performance across dimensions
6. Detect unusual changes
7. Identify contributing dimensions
8. Connect related KPI movements
9. Generate Top Stories
10. Generate Executive Briefs
11. Provide traceable evidence
12. Monitor continuously and generate alerts or reports

## Assumptions

- The dataset used is synthetic and created for this prototype; it is not M&S internal data.
- The KPI definitions and data structure are a proposed operational model based on the Milestone 3 design.
- The prototype demonstrates the analytical workflow rather than representing M&S's actual internal systems.
- Relationships identified between KPIs are analytical signals and should not automatically be interpreted as confirmed causal relationships.
- The prototype is intentionally focused on M&S rather than implementing a full multi-company production system.

## Tech Stack

- React
- Vite
- JavaScript
- Recharts
- XLSX data processing

## Project Purpose

The prototype demonstrates how a business user can move from manually exploring multiple operational metrics to receiving a connected, traceable business story from the same underlying data.
