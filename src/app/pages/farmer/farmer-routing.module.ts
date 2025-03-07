import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FarmerListComponent } from './farmer-list/farmer-list.component';
import { FarmerProfileComponent } from './farmer-profile/farmer-profile.component';

const routes: Routes = [
  {
    path: "",
    component: FarmerListComponent,
  },
  {
    path: ":id",
    component: FarmerProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerRoutingModule {}
