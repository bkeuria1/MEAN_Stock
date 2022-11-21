import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable,of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BuyingPower, ChartData, News, Stock, Suggestion, UserBalance, UserStockTable } from '../interfaces';
@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  private _tradeMessageSource = new Subject<void>()
  tradeMessage$ = this._tradeMessageSource.asObservable()

  private _changeStockSource = new Subject<string>()
  changeMessage$ = this._changeStockSource.asObservable()

  constructor(private http: HttpClient) { }

  getUserStocks():Observable<UserStockTable>{
    return this.http.get(environment.USERSTOCK_URL,{withCredentials:true}) as Observable<UserStockTable>
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
  getUserBuyingPower(){
    //this._tradeMessageSource.next(this.getUserStocks)
    return this.http.get(environment.BUYING_POWER_URL, {withCredentials:true}) as Observable<BuyingPower>
  }
  getStockNews(ticker:string){
    return this.http.get(`${environment.NEWS_URL}?stock=${ticker}`,{withCredentials:true}) as Observable<News>
  }
  downloadTable(table?:Array<Stock>){
    return this.http.post(environment.EXCEL_DOWNLOAD_URL,{"table":table},{withCredentials:true}) as Observable<any>
  }
  refresh(){
    this._tradeMessageSource.next()
  }
  setStock(ticker:string){
    this._changeStockSource.next(ticker)
  }

}
