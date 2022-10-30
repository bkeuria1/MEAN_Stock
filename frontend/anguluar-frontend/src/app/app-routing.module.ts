import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Chart } from 'chart.js';
import { ChartComponent } from './chart/chart.component';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  { path: 'chart/:ticker', component: ChartComponent },
  { path: 'news/:ticker', component: NewsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
