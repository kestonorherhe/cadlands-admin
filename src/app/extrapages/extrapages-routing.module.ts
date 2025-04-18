import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceComponent } from './maintenance/maintenance.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { Login2Component } from '../account/auth/login2/login2.component';
import { Lockscreen2Component } from './lockscreen2/lockscreen2.component';

const routes: Routes = [
    {
        path: 'maintenance',
        component: MaintenanceComponent
    },
    {
        path: '404',
        component: Page404Component
    },
    {
        path: '500',
        component: Page500Component
    },
    {
        path: 'login-2',
        component: Login2Component
    },
    {
        path: 'lock-screen-2',
        component: Lockscreen2Component
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ExtrapagesRoutingModule { }
