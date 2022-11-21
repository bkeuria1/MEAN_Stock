import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserStockTable } from '../interfaces';
import { StockServiceService } from '../services/stock-service.service';
import { StockTableComponent } from '../stock-table/stock-table.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input()
  user!:User
  userStocks! : UserStockTable
  constructor(private stockService:StockServiceService) { }

  ngOnInit(): void {
    this.getUserStocks()
    this.stockService.tradeMessage$.subscribe(()=>{
      this.getUserStocks()
    })
  }
    
  getUserStocks(){
    return this.stockService.getUserStocks().subscribe(result=>{
      this.userStocks = result
    })
  }
  signOut(){
    window.location.href = environment.SIGN_OUT_URL
  }
    

}
