import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestListComponent } from './request-list/request-list.component';

const routes: Routes = [
  {
    path: "",
    component: RequestListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TractorRequestRoutingModule {}
