import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConatinerStockTrackerComponent } from './components/conatiner-stock-tracker/conatiner-stock-tracker.component';

const routes: Routes = [
  {
    path: '',
    component: ConatinerStockTrackerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
