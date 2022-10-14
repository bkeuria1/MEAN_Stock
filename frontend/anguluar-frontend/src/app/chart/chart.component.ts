import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartData, UserBalance } from '../interfaces';
import { StockServiceService } from '../services/stock-service.service';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chartData!: ChartData
  dates!:Array<Date>
  price!:Array<number>
  @Input()ticker!:string
  currentPrice!:Observable<number>
  timeFrame:string ='1D'
  chart!: any;

  constructor(private stockService: StockServiceService) { }

  ngOnInit(): void {
    this.generateChart(this.ticker,this.timeFrame)
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.ticker) this.getCurrentPrice()
    this.generateChart(this.ticker,this.timeFrame)
  }
  getChartData(){
    return this.stockService.getChartData(this.ticker,this.timeFrame)
  }
  getCurrentPrice(){
    this.currentPrice = this.stockService.getCurrentStockPrice(this.ticker)
  }
  getUserBalance(){
    return this.stockService.getUserBalance(this.timeFrame)
  }
  createChart(dates:Array<any>,prices:Array<number>){
    if (this.chart) this.chart.destroy();
    this.chart = new Chart("MyChart", {
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
  generateChart(ticker:string,newTime:string){
    this.timeFrame = newTime
    let dates: Array<any>
    let price: Array<number>
    if(this.ticker.length>0){

      let chartData:ChartData
      this.getChartData().subscribe(result=>{
          chartData = Object.keys(result).sort().reduce(
          (sortedResults: ChartData,key)=>{
            sortedResults[key] = result[key]
            return sortedResults
          },
          {}
        )
        dates = Object.keys(chartData)
        price = Object.keys(chartData).map(key => chartData[key].close)
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
}
