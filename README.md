# 🐝 SwarmFi Perps — AI Agent Swarm Trading Signals

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org/)
[![dYdX](https://img.shields.io/badge/dYdX-v4-6967FF?logo=dydx)](https://dydx.exchange/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**SwarmFi Perps** is a zero-token AI agent swarm intelligence platform that analyzes perpetual futures markets in real-time using the dYdX v4 Indexer API. Nine specialized agents independently evaluate market conditions through stigmergic coordination and adversarial weighted consensus to produce actionable LONG/SHORT/NEUTRAL trading signals.

> 🔒 **US-Friendly**: Built on dYdX's publicly accessible Indexer API — no geo-restrictions unlike Hyperliquid.

---

## 🎯 Hackathon Pitch

With Hyperliquid blocking US-based users from accessing its API, we saw an opportunity to build something **even better** using dYdX v4's richer, unrestricted data set. SwarmFi Perps combines the proven stigmergic agent swarm architecture from our [SwarmFi](https://github.com/zan-maker/swarmfi) project with institutional-grade perpetual market data.

### What Makes It Different

| Capability | Hyperliquid API (US Blocked) | dYdX Indexer (US Accessible) |
|---|---|---|
| Market metadata | ✅ | ✅ |
| Orderbook depth | ✅ | ✅ |
| Trade history | ✅ | ✅ |
| OHLCV Candles | ✅ | ✅ |
| Historical funding | ✅ | ✅ |
| Sparklines | ❌ | ✅ |
| Historical PnL | ❌ | ✅ |
| Rewards tracking | ❌ | ✅ |
| Compliance screen | ❌ | ✅ |
| Vault analytics | Limited | Rich (positions + PnL) |
| WebSocket feeds | Blocked in US | ✅ US accessible |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐  │
│  │ Consensus│  │ Agent    │  │ Price    │  │ Order Book  │  │
│  │ Signal   │  │ Grid     │  │ Chart    │  │ + Trades    │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └──────┬──────┘  │
│       └─────────────┴─────────────┴──────────────┘         │
│                         │ API                              │
├─────────────────────────┼─────────────────────────────────  │
│                    Backend (API Routes)                      │
│  ┌──────────────────────┼──────────────────────────────┐   │
│  │              Swarm Engine                             │   │
│  │  ┌───────────┐  ┌──────────┐  ┌─────────────────┐  │   │
│  │  │ 9 Agents  │→ │Consensus │→ │Stigmergy Board  │  │   │
│  │  │ (parallel)│  │ Algorithm│  │(shared state)    │  │   │
│  │  └───────────┘  └──────────┘  └─────────────────┘  │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                   │
│  ┌──────────────────────┼──────────────────────────────┐   │
│  │           dYdX v4 Indexer API (Public)              │   │
│  │  Markets │ Orderbook │ Trades │ Candles │ Funding   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🤖 The 9 Agents

Each agent independently analyzes a specific aspect of market data and casts a weighted vote:

| # | Agent | Signal Source | Weight |
|---|-------|--------------|--------|
| 1 | **FundingAgent** | Historical funding rates & consecutive direction | 1.3 |
| 2 | **MomentumAgent** | Price vs SMA crossovers, consecutive candles | 1.1 |
| 3 | **VolatilityAgent** | Hourly returns std dev, range compression | 0.8 |
| 4 | **VolumeAgent** | Volume ratio (recent/avg), buy/sell imbalance | 1.2 |
| 5 | **OrderbookAgent** | Bid/ask depth at multiple levels, spread analysis | 1.0 |
| 6 | **LiquidationAgent** | Funding + volatility + wick rejection patterns | 1.4 |
| 7 | **MeanReversionAgent** | Z-score distance from price mean | 0.9 |
| 8 | **TrendAgent** | Multi-timeframe SMA alignment | 1.1 |
| 9 | **SentimentAgent** | Meta-agent — synthesizes all other agents' votes | 1.0 |

### Consensus Algorithm

1. **Weighted Voting**: Each agent's vote is scaled by both its configured weight AND its confidence score
2. **Adversarial Check**: If bullish/bearish agents are evenly split, confidence is halved (reducing false signals)
3. **Stigmergy Board**: Agents share state across analysis runs (previous signals, volatility regime, liquidation risk)
4. **Signal Output**: LONG / SHORT / NEUTRAL with confidence score 0-100

---

## 🚀 Getting Started

### Prerequisites

- **Bun** (v1.0+)
- **Node.js** (v18+)

### Installation

```bash
# Clone the repo
git clone https://github.com/zan-maker/swarmfi-perps.git
cd swarmfi-perps

# Install dependencies
bun install

# Set up database
bun run db:push

# Start development server
bun run dev
```

The app will be available at `http://localhost:3000`.

### Environment Variables

Create a `.env` file in the root:

```env
# Database (SQLite — default is fine for development)
DATABASE_URL="file:./dev.db"
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── dydx/
│   │   │   ├── markets/route.ts    # dYdX market metadata proxy
│   │   │   ├── orderbook/route.ts  # Real-time orderbook
│   │   │   ├── trades/route.ts     # Recent trades
│   │   │   ├── candles/route.ts    # OHLCV candle data
│   │   │   └── funding/route.ts    # Historical funding rates
│   │   └── swarm/
│   │       ├── agents/route.ts     # Agent state data
│   │       ├── consensus/route.ts  # Run swarm analysis / get result
│   │       └── history/route.ts    # Signal history
│   ├── layout.tsx
│   ├── page.tsx                    # Main dashboard
│   └── globals.css
├── components/
│   └── dashboard/
│       ├── Header.tsx              # Market selector + run swarm
│       ├── ConsensusSignal.tsx     # Main signal display with confidence ring
│       ├── AgentSwarmGrid.tsx      # 3×3 agent card grid
│       ├── SwarmControls.tsx       # Auto-refresh, confidence threshold
│       ├── PriceChart.tsx          # Price candlestick chart
│       ├── FundingChart.tsx        # Funding rate history
│       ├── OrderBook.tsx           # Bid/ask depth display
│       ├── RecentTrades.tsx        # Trade feed
│       └── SignalHistory.tsx       # Past consensus signals
├── lib/
│   ├── dydx.ts                     # dYdX v4 Indexer API client
│   ├── store.ts                    # Zustand state management
│   ├── hooks.ts                    # Data fetching hooks + mock generators
│   ├── db.ts                       # Prisma database client
│   ├── utils.ts
│   └── swarm/
│       ├── types.ts                # Type definitions
│       ├── agents.ts               # 9 specialized agents
│       ├── consensus.ts            # Adversarial weighted consensus
│       └── index.ts                # Full pipeline orchestrator
prisma/
└── schema.prisma                   # SQLite schema
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| State | Zustand |
| Database | SQLite + Prisma ORM |
| Animation | Framer Motion |
| Charts | Recharts + Custom SVG |
| Data Source | dYdX v4 Indexer API (public) |

---

## 🔮 Future Enhancements

- [ ] **WebSocket Integration**: Real-time data streaming via dYdX WebSocket API
- [ ] **Cross-Exchange Arbitrage**: Compare signals across dYdX, GMX, Synthetix
- [ ] **Backtesting Engine**: Historical signal performance analysis
- [ ] **Mobile App**: React Native companion for on-the-go signals
- [ ] **Telegram/Discord Bot**: Push alerts when consensus crosses threshold
- [ ] **Vault Analyzer**: MegaVault PnL tracking and yield comparison
- [ ] **Compliance Screen**: Regulatory risk scoring via dYdX compliance endpoint

---

## 📜 License

MIT License — free for personal and commercial use.

---

## 👤 Author

Built by **[zan-maker](https://github.com/zan-maker)** — CFO by day, vibe coder and claw fan by night.

> *"Stigmergy + PARL + adversarial consensus for 9 enterprise domains."*
