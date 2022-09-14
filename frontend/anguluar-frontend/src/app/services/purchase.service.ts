import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlHandlingStrategy } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  makePurchase(transactionType:string){
    let url_type = `${transactionType}_URL`
    let url = `${environment}.url_type}`
   
  }
}
