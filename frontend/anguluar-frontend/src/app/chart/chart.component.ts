import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartData } from '../interfaces';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chartData!: Observable<Array<ChartData>>
  @Input()ticker!:string
  constructor() { }

  ngOnInit(): void {
  }
  getChartData(){

  }

}
