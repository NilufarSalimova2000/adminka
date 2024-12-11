export interface ProductType {
    count: number,
    next: "string",
    previous: "string",
    results: 
      {
        id: number,
        image: string,
        title: string,
        price: string,
        is_available: boolean,
        category: number,
        is_new: boolean
      }[]
    
  }