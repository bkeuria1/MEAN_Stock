import { Component, OnInit,Input } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor(private stockService:StockServiceService) { }

  ngOnInit(): void {
    this.checkOwnernShip()
    console.log(this.currentPrice)
  }
  checkOwnernShip(){
    this.stockService.ownsStock(this.ticker).subscribe(result=>{
      this.ownsStock = result
    })
  }
}

