import { Component, OnInit } from '@angular/core';
import { StockServiceService } from '../services/stock-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Suggestion } from '../interfaces';
@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  currentPrice!:Observable<number>
  ticker:string=''
  finalTicker:string = ''
  suggestions?:Observable<Array<Suggestion>>

  constructor(private stockService: StockServiceService) { }

  ngOnInit(): void {
  }
  searchStock(ticker:string){
    this.finalTicker = ticker
    try{
      this.currentPrice = this.stockService.getCurrentStockPrice(ticker)
    }catch(err:any){
      console.log(err)
    }
  }
  getSuggestions(query:string){
    this.suggestions = this.stockService.getStockSuggestion(query)
    console.log("Get suggestions called")
  
  }
 

}
