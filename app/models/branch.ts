export interface Branch {
  id: string;
  name: string;

  image?: string;
  instagram?: string;
  facebook?: string;

  lines?: Line[];
}

export interface Line {
  id: string;
  dinnersRange: number[];
  active: boolean;
}
