import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Stock, UserStockTable } from '../interfaces';
import { StockServiceService } from '../services/stock-service.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {
  @Input()
  userStocks? :UserStockTable
  @ViewChild('table') userTable?: ElementRef;
  constructor(private stockService: StockServiceService) { }

  ngOnInit(): void {
   
    //console.log("Here are the users stock" + this.userStocks)
  }
  setStock(ticker:string){
    this.stockService.setStock(ticker);
  }
  download(){
    try{
      const workSheet = XLSX.utils.table_to_sheet(document.getElementById('table'),{sheet:"Sheet"})
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, workSheet, 'Sheet');
      XLSX.writeFile(wb,'table.xlsx')
    }catch(err){
      console.log(err)
    }
}
  }
