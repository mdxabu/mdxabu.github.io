---
date : '2025-12-09T12:26:07+05:30'
draft : false
title : 'NetResSim: Evaluating Internet Resilience using RIPE Atlas'
toc : false
comments: true
otherBlogs: true
tags: ["Computer Network", "Open Source"]
image: ""
---

This project examines the impact of simulated regional network disruptions on Internet performance using real-world measurement data. The goal is to understand how large-scale events can influence Internet connectivity and routing dynamics, and to evaluate the resilience of Internet infrastructure under stress.

# Network Resilience Event Analysis
This project analyzes the impact of various network disruption events on Internet infrastructure, including natural disasters, submarine cable cuts, and geopolitical conflicts.

# Features
- Fetches data from RIPE RIS/RIPEstat for AS reachability
- Analyzes baseline, event, and recovery phases
- Generates comprehensive visualizations for each event
- Saves individual analysis plots with detailed metrics

# Events Analyzed
- Croatia Earthquake 2020
- Puerto Rico Earthquake 2020
- Hengchun Submarine Cable Cut 2006
- SEA-ME-WE Disruption 2008
- Israel Iran Conflict 2025
- Nepal Earthquake 2015


You can find my code [here](https://github.com/mdxabu/NetResSim).

# Usage
```bash
pip install -r requirements.txt
```

# Output
- Individual analysis plots saved in output/ directory
- Detailed console output with metrics for each event phase
- Impact percentages and recovery rates

# Sample Outputs

## Nepal Earthquake 2015
 ### AS Reachability
 ![AS Reachability](https://github.com/mdxabu/NetResSim/blob/main/output/Nepal_Earthquake_2015/as_reachability.png?raw=true)

 ### Network Latency
 ![Network Latency](https://github.com/mdxabu/NetResSim/blob/main/output/Nepal_Earthquake_2015/network_latency.png?raw=true)

 ### Regional Traffic
 ![Regional Traffic](https://github.com/mdxabu/NetResSim/blob/main/output/Nepal_Earthquake_2015/regional_traffic.png?raw=true)

## Metric Definitions

- **AS Reachability:** The proportion of autonomous systems (ASes) that remain reachable through the Internet routing system during an event, compared with the baseline.
- **Network Latency:** The time required for data to travel between measurement points, typically measured in milliseconds; higher latency indicates slower communication.
- **Regional Traffic:** The volume or distribution of Internet traffic associated with a geographic region, showing how traffic patterns change during and after a disruption.
