export interface CategoryType {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
      id: number;
      title: string;
      image: string;
      parent: number;
    }[];
  };
  