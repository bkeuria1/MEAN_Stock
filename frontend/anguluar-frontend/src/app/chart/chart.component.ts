import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartData } from '../interfaces';
import { StockServiceService } from '../services/stock-service.service';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chartData!: ChartData
  @Input()ticker!:string
  @Input()currentPrice!:Number
  timeFrame:string ='1D'
  chart!: any;
  constructor(private stockService: StockServiceService) { }

  ngOnInit(): void {
    this.generateChart(this.timeFrame)

  }
  getChartData(){
    return this.stockService.getChartData(this.ticker,this.timeFrame)
  }
  createChart(){
    if (this.chart) this.chart.destroy();
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: Object.keys(this.chartData), 
	       datasets: [
          {
            label: "price",
            data: Object.keys(this.chartData).map(key => this.chartData[key].close),
            backgroundColor: 'blue'
          }
        ]
      },
    
    }); 
   
  }
  generateChart(newTime:string){
    this.timeFrame = newTime
    console.log(this.timeFrame)
    console.log("change")
    this.getChartData().subscribe(result=>{
      this.chartData = Object.keys(result).sort().reduce(
        (sortedResults: ChartData,key)=>{
          sortedResults[key] = result[key]
          return sortedResults
        },
        {}
      )
      this.createChart()
    })
  }

}
