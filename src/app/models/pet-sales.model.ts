  export interface PetSalesDaily {
    date: string;
    dogs: number;
    cats: number;
    birds: number;
    total: number;
  }
  
  export interface PetSalesWeekly {
    dates: string[];
    dogs: number[];
    cats: number[];
    birds: number[];
    totals: number[];
  }