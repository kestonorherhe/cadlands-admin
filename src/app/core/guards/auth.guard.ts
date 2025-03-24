import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/auth.service";
import { AuthfakeauthenticationService } from "../services/authfake.service";

@Injectable({ providedIn: "root" })
export class AuthGuard  {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authFackservice.currentUserValue;
    console.log("currentUser ::", currentUser)
    if (currentUser) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    // this.router.navigate(["/account/login"], {
    //   queryParams: { returnUrl: state.url },
    // });
    this.router.navigate(["/account/login"]);
    return false;
  }
}
