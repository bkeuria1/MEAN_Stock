import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../interfaces';
import { StockServiceService } from '../services/stock-service.service';
import { ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  @Input()
  ticker:string = ''
  news!:Observable<News>
  constructor(private stockService:StockServiceService,private route: ActivatedRoute) { }

  ngOnInit(): void {
     
  }
  getNews(){
    this.news = this.stockService.getStockNews(this.ticker)
  }
  ngOnChanges(changes:SimpleChange){
    this.getNews()
  }
  ngOnDestroy(){
  
  }

}
