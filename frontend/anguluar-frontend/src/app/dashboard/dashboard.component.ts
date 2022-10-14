import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStockTable } from '../interfaces';
import { StockServiceService } from '../services/stock-service.service';
import { StockTableComponent } from '../stock-table/stock-table.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userStocks! : UserStockTable
  constructor(private stockService:StockServiceService) { }

  ngOnInit(): void {
    this.getUserStocks()
    this.stockService.tradeMessage$.subscribe(()=>{
      console.log("Subscription called")
      this.getUserStocks()
    })
  }
    
  getUserStocks(){
    return this.stockService.getUserStocks().subscribe(result=>{
      this.userStocks = result
    })
  }
    

}
