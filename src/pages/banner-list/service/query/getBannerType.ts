export interface BannerType {

    count: number,
    next: "string",
    previous: "string",
    results: 
        {
            id: number,
            created_at: string,
            updated_at: string,
            image: string,
            title: string,
            description: string
        }[]
    

}