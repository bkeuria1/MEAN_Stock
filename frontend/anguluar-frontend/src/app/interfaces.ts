import { NumberSymbol } from "@angular/common";

export interface isSignedIn{
    result: String;
}
export interface User{
    googleId: String  
    displayName: String
    firstName: String
    lastName: String
    email:String
    image:String
    buyingPower:Number
    balance:[{date: String, balance: Number}]
    createdAt: Date
}

export interface Stock{
    ticker: string
    quantity: number
    total:number
    price:number
    date: Date
}
export interface Suggestion{
    Name:string
    Symbol: string
}
interface DayData{
    close:number
    volume:number
    low:number
    high:number
}
export interface ChartData{
  [key: string]:DayData
} 
export interface UserBalance{
    date:Date
    balance:number
}
export interface BuyingPower{
    buyingPower: number
}
export interface UserStockTable {
    table: Array<Stock>
    totalAssets: number
}
interface NewsEntities{
    title:string
    description:string
    url:string
    image_url:string
    published_at:Date
    source:string
}
export interface News{
    data:NewsEntities[]
}