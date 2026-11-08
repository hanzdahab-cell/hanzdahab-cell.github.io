import type { TrainingCartItem } from '../../types';

export type PricingTableId =
  | 'lighthouse-group-training'
  | 'blue-hole-group-training'
  | 'private-sessions'
  | 'advanced-training-packages'
  | 'training-week'
  | 'basic-master'
  | 'master-equipment-rental'
  | 'monofin-course'
  | 'no-fins-course';

const TABLE_HTML: Record<PricingTableId, string> = {
  'lighthouse-group-training':
    '<table class="fd-t"><thead><tr><th scope="col">Group size</th><th scope="col">1 session</th><th scope="col">2 sessions</th></tr></thead><tbody><tr><th scope="row">1 person</th><td>€45</td><td>€75</td></tr><tr><th scope="row">2 people</th><td>€45</td><td>€75</td></tr><tr><th scope="row">3 people</th><td>€40</td><td>€70</td></tr></tbody></table>',
  'blue-hole-group-training':
    '<table class="fd-t"><thead><tr><th scope="col">Group size</th><th scope="col">1 session</th><th scope="col">2 sessions</th></tr></thead><tbody><tr><th scope="row">1 person</th><td>€64</td><td>€94</td></tr><tr><th scope="row">2 people</th><td>€64</td><td>€94</td></tr><tr><th scope="row">3 people</th><td>€50</td><td>€80</td></tr></tbody></table>',
  'private-sessions':
    '<table class="fd-t"><thead><tr><th scope="col">Location</th><th scope="col">One session</th><th scope="col">Two sessions</th></tr></thead><tbody><tr><th scope="row">Lighthouse</th><td>€60 per person</td><td>€105 per person</td></tr><tr><th scope="row">Blue Hole</th><td>€80 per person</td><td>€125 per person</td></tr></tbody></table>',
  'advanced-training-packages':
    '<table class="fd-t"><thead><tr><th scope="col">Duration</th><th scope="col">Sessions with an instructor</th><th scope="col">Price</th></tr></thead><tbody><tr><th scope="row">2 weeks</th><td>10 sessions</td><td>€375</td></tr><tr><th scope="row">3 weeks</th><td>15 sessions</td><td>€535</td></tr><tr><th scope="row">4 weeks</th><td>20 sessions</td><td>€665</td></tr></tbody></table>',
  'training-week':
    '<table class="fd-t"><thead><tr><th scope="col">Option</th><th scope="col">Price</th></tr></thead><tbody><tr><th scope="row">Diving only</th><td>€300</td></tr><tr><th scope="row">Diving + 8 nights of accommodation (low season)</th><td>€445</td></tr><tr><th scope="row">Diving + 8 nights of accommodation (high season)</th><td>€485</td></tr></tbody></table>',
  'basic-master':
    '<table class="fd-t"><thead><tr><th scope="col">Duration</th><th scope="col">Coaching sessions</th><th scope="col">Price</th></tr></thead><tbody><tr><th scope="row">2 weeks</th><td>6</td><td>€335</td></tr><tr><th scope="row">3 weeks</th><td>9</td><td>€470</td></tr><tr><th scope="row">4 weeks</th><td>12</td><td>€595</td></tr></tbody></table>',
  'master-equipment-rental':
    '<table class="fd-t"><thead><tr><th scope="col">Duration</th><th scope="col">Price</th></tr></thead><tbody><tr><th scope="row">2 weeks</th><td>€100</td></tr><tr><th scope="row">3 weeks</th><td>€130</td></tr><tr><th scope="row">4 weeks</th><td>€150</td></tr></tbody></table>',
  'monofin-course':
    '<table class="fd-t"><thead><tr><th scope="col">Option</th><th scope="col">Price</th><th scope="col">Included</th></tr></thead><tbody><tr><th scope="row">Pool course, one student</th><td>€125</td><td>Training fins/monofins, digital manual, SSI Monofin Pool certification, pool fees and transport</td></tr><tr><th scope="row">Pool course, per student when multiple students join</th><td>€110</td><td>Same as above</td></tr><tr><th scope="row">Full course with open-water dives, one student</th><td>€205</td><td>Two open-water sessions and full Monofin certification</td></tr><tr><th scope="row">Full course with open-water dives, per student when multiple students join</th><td>€190</td><td>Two open-water sessions and full Monofin certification</td></tr></tbody></table>',
  'no-fins-course':
    '<table class="fd-t"><thead><tr><th scope="col">Option</th><th scope="col">Price</th><th scope="col">Included</th></tr></thead><tbody><tr><th scope="row">One student</th><td>€125</td><td>Digital SSI certification, transport and pool entry</td></tr><tr><th scope="row">Per student when multiple students join</th><td>€100</td><td>Same as above</td></tr></tbody></table>',
};

interface TrainingRateRow {
  label: string;
  cells: string[];
  options: TrainingCartItem[];
}

interface TrainingRateTable {
  headers: string[];
  rows: TrainingRateRow[];
}

function createGroupRow(
  location: string,
  locationId: string,
  groupSize: number,
  oneSessionPrice: number,
  twoSessionPrice: number,
): TrainingRateRow {
  const people = `${groupSize} ${groupSize === 1 ? 'person' : 'people'}`;
  return {
    label: people,
    cells: [`€${oneSessionPrice}`, `€${twoSessionPrice}`],
    options: [
      {
        id: `${locationId}-${groupSize}-one-session`,
        title: `${location} · 1 session · ${people}`,
        unitPriceEur: oneSessionPrice,
        quantity: groupSize,
        perDiver: false,
      },
      {
        id: `${locationId}-${groupSize}-two-sessions`,
        title: `${location} · 2 sessions · ${people}`,
        unitPriceEur: twoSessionPrice,
        quantity: groupSize,
        perDiver: false,
      },
    ],
  };
}

const TRAINING_RATE_TABLES: Partial<Record<PricingTableId, TrainingRateTable>> = {
  'lighthouse-group-training': {
    headers: ['Group size', '1 session', '2 sessions'],
    rows: [
      createGroupRow('Lighthouse Bay', 'lighthouse', 1, 45, 75),
      createGroupRow('Lighthouse Bay', 'lighthouse', 2, 45, 75),
      createGroupRow('Lighthouse Bay', 'lighthouse', 3, 40, 70),
    ],
  },
  'blue-hole-group-training': {
    headers: ['Group size', '1 session', '2 sessions'],
    rows: [
      createGroupRow('Blue Hole', 'blue-hole', 1, 64, 94),
      createGroupRow('Blue Hole', 'blue-hole', 2, 64, 94),
      createGroupRow('Blue Hole', 'blue-hole', 3, 50, 80),
    ],
  },
  'private-sessions': {
    headers: ['Location', 'One session', 'Two sessions'],
    rows: [
      {
        label: 'Lighthouse',
        cells: ['€60 per person', '€105 per person'],
        options: [
          { id: 'private-lighthouse-one', title: 'Private · Lighthouse · 1 session', unitPriceEur: 60, quantity: 1, perDiver: true },
          { id: 'private-lighthouse-two', title: 'Private · Lighthouse · 2 sessions', unitPriceEur: 105, quantity: 1, perDiver: true },
        ],
      },
      {
        label: 'Blue Hole',
        cells: ['€80 per person', '€125 per person'],
        options: [
          { id: 'private-blue-hole-one', title: 'Private · Blue Hole · 1 session', unitPriceEur: 80, quantity: 1, perDiver: true },
          { id: 'private-blue-hole-two', title: 'Private · Blue Hole · 2 sessions', unitPriceEur: 125, quantity: 1, perDiver: true },
        ],
      },
    ],
  },
  'advanced-training-packages': {
    headers: ['Duration', 'Sessions with an instructor', 'Price'],
    rows: [
      { label: '2 weeks', cells: ['10 sessions', '€375'], options: [{ id: 'advanced-training-two-weeks', title: 'Advanced Training · 2 weeks · 10 sessions', unitPriceEur: 375, quantity: 1, perDiver: true }] },
      { label: '3 weeks', cells: ['15 sessions', '€535'], options: [{ id: 'advanced-training-three-weeks', title: 'Advanced Training · 3 weeks · 15 sessions', unitPriceEur: 535, quantity: 1, perDiver: true }] },
      { label: '4 weeks', cells: ['20 sessions', '€665'], options: [{ id: 'advanced-training-four-weeks', title: 'Advanced Training · 4 weeks · 20 sessions', unitPriceEur: 665, quantity: 1, perDiver: true }] },
    ],
  },
};

function TrainingRateTableView({
  config,
  selectedIds,
  onAdd,
}: {
  config: TrainingRateTable;
  selectedIds: Set<string>;
  onAdd: (item: TrainingCartItem) => void;
}) {
  return (
    <div className="fd-w">
      <table className="fd-t min-w-[48rem]">
        <thead>
          <tr>
            {config.headers.map((header) => <th key={header} scope="col">{header}</th>)}
            <th scope="col">Add to request</th>
          </tr>
        </thead>
        <tbody>
          {config.rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {row.cells.map((cell, index) => <td key={`${row.label}-${index}`}>{cell}</td>)}
              <td>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {row.options.map((option) => {
                    const isAdded = selectedIds.has(option.id);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => onAdd(option)}
                        disabled={isAdded}
                        aria-label={`${isAdded ? 'Added' : 'Add'} ${option.title} to training request`}
                        className="min-h-11 whitespace-nowrap rounded px-1 py-1 text-xs font-semibold text-[#013472] underline underline-offset-2 hover:bg-[#013472]/10 disabled:cursor-default disabled:no-underline disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#013472]"
                      >
                        {isAdded ? 'Added' : 'Add to request'}
                      </button>
                    );
                  })}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PricingTable({
  table,
  onAddTrainingOption,
  selectedTrainingOptionIds,
}: {
  table: PricingTableId;
  onAddTrainingOption?: (item: TrainingCartItem) => void;
  selectedTrainingOptionIds?: Set<string>;
}) {
  const trainingTable = TRAINING_RATE_TABLES[table];
  if (trainingTable && onAddTrainingOption) {
    return (
      <TrainingRateTableView
        config={trainingTable}
        selectedIds={selectedTrainingOptionIds ?? new Set<string>()}
        onAdd={onAddTrainingOption}
      />
    );
  }

  return (
    <div
      className="fd-w"
      dangerouslySetInnerHTML={{ __html: TABLE_HTML[table] }}
    />
  );
}
