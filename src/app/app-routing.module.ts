import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConatinerStockTrackerComponent } from './components/conatiner-stock-tracker/conatiner-stock-tracker.component';
import { ContainerSentimentComponent } from './components/container-sentiment/container-sentiment.component';

const routes: Routes = [
  {
    path: '',
    component: ConatinerStockTrackerComponent,
  },
  {
    path: 'sentiment/:symbol',
    component: ContainerSentimentComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
