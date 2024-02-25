export interface Movie {
  name: string;
  year?: number;
  cast?:string[];
  createdAt?: Date;
  id?:number
}

export const Movie = (name: string, year?: number, cast?: string[]) => {
    const currentYear = new Date().getFullYear();
    const defaultYear = (year === undefined || year > currentYear) ? currentYear : year;
    const defaultCast = cast ?? [];
  
    return {
      name,
      year: defaultYear,
      cast: defaultCast,
      createdAt: new Date(),
    };
  };



