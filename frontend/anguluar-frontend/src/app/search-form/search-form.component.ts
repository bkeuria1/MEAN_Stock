import { Component, OnInit } from '@angular/core';
import { StockServiceService } from '../services/stock-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  currentPrice!:Observable<Number>
  ticker:string=''
  err:any = ''
  constructor(private stockService: StockServiceService) { }

  ngOnInit(): void {
  }
  searchStock(ticker:string){
    console.log(ticker)
    try{
      this.currentPrice = this.stockService.getCurrentStockPrice(ticker)
    }catch(err:any){
      this.err = err
    }
  }
 

}
