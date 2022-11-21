import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BuyingPower, UserBalance, UserStockTable } from '../interfaces';
import { StockServiceService } from '../services/stock-service.service';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
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
  faRotateRight = faRotateRight
  constructor(private stockService: StockServiceService) { }

  ngOnInit(): void {
    this.getBuyingPower()
    this.stockService.tradeMessage$.subscribe(()=>{
      this.getBuyingPower()
    })
  }

  getBuyingPower(){
    return this.stockService.getUserBuyingPower().subscribe(result =>{
      this.buyingPower = result.buyingPower
    })
  }

  refresh(){
    this.stockService.refresh()
  }

}
