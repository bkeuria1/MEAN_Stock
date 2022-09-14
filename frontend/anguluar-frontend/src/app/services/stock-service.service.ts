import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartData, Stock, Suggestion, UserBalance } from '../interfaces';
@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  constructor(private http: HttpClient) { }

  getUserStocks():Observable<Array<Stock>>{
    
    return this.http.get(environment.USERSTOCK_URL,{withCredentials:true}) as Observable<Array<Stock>>
  }
  getStockSuggestion(query:string):Observable<Array<Suggestion>>{
    return this.http.get(`${environment.AUTOCOMPLETE_URL}?query=${query}`, {withCredentials:true}) as Observable<Array<Suggestion>>
  }
  getCurrentStockPrice(ticker:string):Observable<number>{
    return this.http.get(`${environment.REALTIME_URL}?stock=${ticker}`,{withCredentials:true}) as Observable<number>
  }

  getChartData(ticker:string, timeFrame:string):Observable<ChartData>{
    return this.http.get(`${environment.CHART_URL}?stock=${ticker}&timeFrame=${timeFrame}`,{withCredentials:true}) as Observable<ChartData>
  }
  ownsStock(ticker:String):Observable<boolean>{
    return this.http.get(`${environment.OWNS_STOCK_URL}?ticker=${ticker}`,{withCredentials:true}) as Observable<boolean>
  }
  getUserBalance(timeFrame:string){
    return this.http.get(`${environment.BALANCE_URL}?timeFrame=${timeFrame}`,{withCredentials:true}) as Observable<Array<UserBalance>>
  }
}
