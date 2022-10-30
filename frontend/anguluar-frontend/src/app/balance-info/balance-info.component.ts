import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BuyingPower, UserBalance, UserStockTable } from '../interfaces';
import { StockServiceService } from '../services/stock-service.service';

@Component({
  selector: 'app-balance-info',
  templateUrl: './balance-info.component.html',
  styleUrls: ['./balance-info.component.css']
})
export class BalanceInfoComponent implements OnInit {
  @Input()
  userStocks!:UserStockTable
  balance!:number
  buyingPower!: number
  constructor(private stockService: StockServiceService) { }

  ngOnInit(): void {
   // this.getUserBalance()
    this.getBuyingPower()
    this.stockService.tradeMessage$.subscribe(()=>{
      this.getBuyingPower()
      console.log("Hey buying power sub")
    })
  }
  getUserBalance(){
    //this.balance = this.stockService.getUserBalance('1D')
  }
  getBuyingPower(){
    return this.stockService.getUserBuyingPower().subscribe(result =>{
      this.buyingPower = result.buyingPower
    })
  }

}
