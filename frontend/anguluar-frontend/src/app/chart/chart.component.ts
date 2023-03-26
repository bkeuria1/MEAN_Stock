import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartData, PriceData, UserBalance } from '../interfaces';
import { StockServiceService } from '../services/stock-service.service';
import Chart from 'chart.js/auto';
import { ActivatedRoute } from '@angular/router';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input()
  ticker!:string
  chartData!: ChartData
  dates!:Array<Date>
  price!:Array<number>
  currentPrice!:number
  timeFrame:string ='max'
  chart!: any;
  faRotateRight = faRotateRight

  constructor(private stockService: StockServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.ticker) this.getCurrentPrice()
    this.getCurrentPrice()
    this.generateChart(this.timeFrame)
  }
  getChartData(){
    return this.stockService.getChartData(this.ticker,this.timeFrame)
  }
  getCurrentPrice(){
    this.stockService.getCurrentStockPrice(this.ticker).subscribe(result=>{
      this.currentPrice = result.price
    })
  }
  getUserBalance(){
    return this.stockService.getUserBalance(this.timeFrame)
  }
  createChart(dates:Array<any>,prices:Array<number>){
    if (this.chart) this.chart.destroy();
    this.chart = new Chart("Chart", {
      type: 'line', //this denotes tha type of chart
 
      data: {// values on X-Axis
        labels: dates,
	       datasets: [
          {
            label: "price",
            data: prices,
            backgroundColor: 'blue'
          }
        ]
      },
    
    }); 
   
  }
  generateChart(newTime:string){
    this.timeFrame = newTime
    let dates: Array<any>
    let price: Array<number>
    if(this.ticker.length>0){
      this.getChartData().subscribe(result=>{
        console.log(result)
        dates = result.map(items => items.date)
        price = result.map(items => items.price)
        this.createChart(dates,price)
        
      })

    }else{

      let UserBalance : Array<UserBalance>
      this.getUserBalance().subscribe(result=>{
        UserBalance = result
        dates = UserBalance.map(balance => balance.date)
        price = UserBalance.map(balance => balance.balance)
        this.createChart(dates,price)
        
      })

    } 
  }

  refresh(){
    this.getCurrentPrice()
    if(this.timeFrame == "1D"){
      this.generateChart("1D")
    }
  }
}
