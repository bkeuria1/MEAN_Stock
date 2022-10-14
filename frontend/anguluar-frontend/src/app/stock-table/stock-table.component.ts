import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock, UserStockTable } from '../interfaces';
import { StockServiceService } from '../services/stock-service.service';
@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {
  @Input()
  userStocks? :UserStockTable
  constructor(private stockService: StockServiceService) { }

  ngOnInit(): void {
   
    //console.log("Here are the users stock" + this.userStocks)
  }
  setStock(ticker:string){
    this.stockService.setStock(ticker);
  }
   
}
