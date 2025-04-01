import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { Login2Component } from './login2/login2.component';

import { SignupComponent } from './signup/signup.component';
import { Register2Component } from './register2/register2.component';
import { Recoverpwd2Component } from './recoverpwd2/recoverpwd2.component';
import { AffiliateRegistrationComponent } from './affiliate-registration/affiliate-registration.component';
import { AffiliateReferralRegistrationComponent } from './affiliate-referral-registration/affiliate-referral-registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: "login-2",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "signup-2",
    component: Register2Component,
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent,
  },
  {
    path: "recoverpwd-2",
    component: Recoverpwd2Component,
  },
  {
    path: "login",
    component: Login2Component,
  },
  {
    path: "affiliate-registration",
    component: AffiliateRegistrationComponent,
  },
  {
    path: "affiliate-registration/referral/:referralcode",
    component: AffiliateReferralRegistrationComponent,
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
