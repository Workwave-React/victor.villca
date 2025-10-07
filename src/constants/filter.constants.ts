export const GENERATIONS = [
  { label: 'Gen I (Kanto)', value: 1, range: [1, 151] },
  { label: 'Gen II (Johto)', value: 2, range: [152, 251] },
  { label: 'Gen III (Hoenn)', value: 3, range: [252, 386] },
  { label: 'Gen IV (Sinnoh)', value: 4, range: [387, 493] },
  { label: 'Gen V (Unova)', value: 5, range: [494, 649] },
  { label: 'Gen VI (Kalos)', value: 6, range: [650, 721] },
  { label: 'Gen VII (Alola)', value: 7, range: [722, 809] },
  { label: 'Gen VIII (Galar)', value: 8, range: [810, 905] },
  { label: 'Gen IX (Rest)', value: 9, range: [906, 10277] },
] as const;


export const SORT_OPTIONS = [
  { label: 'Name (A-Z)', value: 'name-asc' },
  { label: 'Name (Z-A)', value: 'name-desc' },
] as const;