import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlHandlingStrategy } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stock } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  makePurchase(transactionType:string, stockDetails:Stock){
    if(transactionType == "Buy"){
      return this.http.post(environment.BUY_URL,stockDetails,{withCredentials:true}) as Observable<any>
    }else if(transactionType == "Sell"){
      return this.http.post(environment.SELL_URL,stockDetails,{withCredentials:true}) as Observable<any>
    }
    return
   
  }
}
