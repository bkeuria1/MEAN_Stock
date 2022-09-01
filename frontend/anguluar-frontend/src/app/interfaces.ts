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
    ticker: String
    quantity: number
    total:number
    price:number
    date: Date
}
export interface Suggestion{
    ticker:String
    company: String
}
interface DayData{
    close:number
    volume:number
    low:number
    high:number
}
export interface ChartData{
    date:Date
    dayData: DayData
} 