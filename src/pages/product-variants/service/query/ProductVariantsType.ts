export interface ProductVariantsType {
    count: number,
    next: "string",
    previous: "string",
    results: 
      {
        id: number,
        images?: {
            image: string,
            order: number,
        }[],
        title: string,
        price: string,
        is_available: boolean,
        is_new: boolean,
        product: number,
        attribute_value: number[],
        other_detail: string,
        price_with_discount: string,
        quantity: number
      }[]
}