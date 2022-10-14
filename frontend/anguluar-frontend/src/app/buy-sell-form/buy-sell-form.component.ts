import { Component, OnInit,Input } from '@angular/core';
import { DatasetController } from 'chart.js';
import { Observable } from 'rxjs';
import { Stock } from '../interfaces';
import { PurchaseService } from '../services/purchase.service';
import { StockServiceService } from '../services/stock-service.service';

@Component({
  selector: 'app-buy-sell-form',
  templateUrl: './buy-sell-form.component.html',
  styleUrls: ['./buy-sell-form.component.css']
})
export class BuySellFormComponent implements OnInit {
  @Input()
  currentPrice!:number
  @Input()
  ticker!:string
  shares:number =0
  ownsStock?:boolean
  constructor(private stockService:StockServiceService, private purchaseService: PurchaseService ) { }


  ngOnInit(): void {
    this.checkOwnernShip()
  }
  checkOwnernShip(){
    this.stockService.ownsStock(this.ticker).subscribe(result=>{
      this.ownsStock = result
    })
  }
  makePurchase(purchaseType: string){
    const details:Stock = {
      ticker: this.ticker,
      quantity: this.shares,
      total: this.shares * this.currentPrice,
      price: this.shares * this.currentPrice,
      date: new Date(Date.now())
    }
    this.purchaseService.makePurchase(purchaseType, details)?.subscribe((result)=>{
      console.log(result)
      this.checkOwnernShip()
      this.stockService.refresh()
    })
   
    
  }
}

