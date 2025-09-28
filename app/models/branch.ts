export interface Branch {
  id: string;
  name: string;
  image?: string;

  lines?: Line[];
}

export interface Line {
  id: string;
  dinnersRange: number[];
  active: boolean;
}
