import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyListComponent } from './property-list/property-list.component';
import { AvailablePropertyListComponent } from './available-property-list/available-property-list.component';
import { SoldPropertyListComponent } from './sold-property-list/sold-property-list.component';

const routes: Routes = [
  {
    path: "list",
    component: PropertyListComponent,
  },
  {
    path: "available-property",
    component: AvailablePropertyListComponent,
  },
  {
    path: "sold-property",
    component: SoldPropertyListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyRoutingModule {}
