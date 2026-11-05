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

export function PricingTable({ table }: { table: PricingTableId }) {
  return (
    <div
      className="fd-w"
      dangerouslySetInnerHTML={{ __html: TABLE_HTML[table] }}
    />
  );
}
