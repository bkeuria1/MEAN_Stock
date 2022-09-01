import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../interfaces';
import { StockServiceService } from '../services/stock-service.service';
@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {
  userStocks? : Observable<Array<Stock>>
  constructor(private stockService: StockServiceService) { }

  ngOnInit(): void {
    try{
      this.getUserStocks()
    }catch(err){
      console.log(err)
    }
    //console.log("Here are the users stock" + this.userStocks)
  }
  
  getUserStocks(){
    this.userStocks = this.stockService.getUserStocks()
  }
    
   

}
