# HarborList

Harbor mooring wait board for **Bayline Marina**. HarborList helps dockmasters track incoming vessels, filter the queue by mooring type, and select requests for slip assignment.

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
  components/    MooringBoard, MooringTable, filters, summary widgets
  hooks/         useMooringQueue
  utils/         filtering and formatting helpers
tests/           unit and integration tests (not colocated)
```

## Components

- **MooringBoard** — main wait-board shell
- **MooringTable** — selectable vessel queue table
- **MooringFilter** — filter by mooring type
- **MooringSearch** — search by vessel or captain
- **QueueSummary** — queue counts by status
- **SelectionTray** — shows how many requests are selected for assignment
- **StatusChip** / **PriorityMark** — status and priority indicators

## Requirements

Node.js 20+

## License

MIT — see [LICENSE](LICENSE).
