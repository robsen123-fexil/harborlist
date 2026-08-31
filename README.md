# HarborList

Harbor arrival deck for **Bayline Marina**. HarborList helps dockmasters review incoming vessels on a card grid, filter by mooring type, and queue requests for slip assignment.

## Stack

- React 18.3.1 + TypeScript
- Vite 6
- Vitest 3 + Testing Library

## Getting started

```bash
npm ci
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and production build |
| `npm test` | Run Vitest test suite |
| `npm run lint` | TypeScript type check |

## Project structure

```
src/
  api/           fetchMoorings with request IDs and simulated latency
  components/    HarborDeck, arrival cards, type chips, assignment rail
  hooks/         useHarborArrivals
  utils/         filtering and formatting helpers
tests/           unit and integration tests (not colocated)
```

## Components

- **HarborDeck** — main arrival deck shell with card grid and assignment rail
- **SlipMapStrip** — horizontal marina slip overview (visual context)
- **TypeChipBar** — toggle chips for mooring type filtering
- **ArrivalCard** — expandable vessel card with queue-for-slip action
- **AssignmentRail** — sidebar listing vessels queued for slip assignment
- **QueueSummary** — arrival counts by status
- **StatusChip** / **PriorityMark** — status and priority indicators

## Requirements

Node.js 20+

## License

MIT — see [LICENSE](LICENSE).
