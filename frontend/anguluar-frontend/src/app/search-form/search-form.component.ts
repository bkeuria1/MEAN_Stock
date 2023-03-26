import { Component, OnInit, SimpleChanges } from '@angular/core';
import { StockServiceService } from '../services/stock-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChartComponent } from '../chart/chart.component';
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
  showSuggestions:boolean = true

  constructor(private stockService: StockServiceService) { }

  ngOnInit(): void {
    this.stockService.changeMessage$.subscribe((newTicker)=>{
      this.ticker = newTicker
      this.searchStock(this.ticker)
    })
  }
  searchStock(ticker:string){
    this.showSuggestions = false
    this.finalTicker = ticker
    try{
      // this.currentPrice = this.stockService.getCurrentStockPrice(ticker)
    }catch(err:any){
      console.log(err)
    }
  }
  getSuggestions(query:string){
    this.showSuggestions = true
    this.suggestions = this.stockService.getStockSuggestion(query)
  
  }
}
