interface Date {
  display(withTime?: boolean): string
  YMD(): string
  DMY(): string
  DM(): string
  YM_HYPHEN(): string
  DMY_DOT(): string
  HIS(): string
  HI(): string
  YMDHIS(): string
  DMY_DOT_HI(): string
  MonthYear(): string
}

interface Number {
  pack(): string
}
