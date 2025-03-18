import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";

// import { getFirebaseBackend } from '../../authUtils';

import { User } from "../models/auth.models";
import { Router } from "@angular/router";
import { HttpService } from "./http.service";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  user: User;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private readonly _httpService: HttpService,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Returns the current user
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Performs the auth
   * @param formData
   */
  login(credential) {
    console.log("logging in...");
    return this.http
      .post<any>(`${environment.apiUrl}/auth/admin-login`, credential)
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          console.log("user__service__response ::", user);
          if (user?.data && user?.data?.accessToken) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(
              "menuList",
              JSON.stringify(user?.data?.menuList)
            );
            localStorage.setItem("currentUser", JSON.stringify(user?.data));
            localStorage.setItem(
              "token",
              JSON.stringify(user?.data?.accessToken)
            );
            this.currentUserSubject.next(user?.data);
          }
          return user;
        })
      );
  }
  affiliateRegistration(credential) {
    console.log("affiliate registration...");
    return this.http
      .post<any>(
        `${environment.apiUrl}/admins/affiliate-registration`,
        credential
      )
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          console.log("user__service__response ::", user);
          return user;
        })
      );
  }

  /**
   * Performs the register
   * @param email email
   * @param password password
   */
  register(registerDto: any) {
    return this.http
      .post<any>(`${environment.apiUrl}auth/register`, registerDto)
      .pipe(
        map((response) => {
          // login successful if there's a jwt token in the response
          console.log("user__service__response ::", response);
          return response;
        })
      );
  }

  /**
   * Reset password
   * @param email email
   */
  resetPassword(email: string) {
    // return getFirebaseBackend().forgetPassword(email).then((response: any) => {
    //     const message = response.data;
    //     return message;
    // });
    return;
  }

  /**
   * Logout the user
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    localStorage.removeItem("menuList");
    localStorage.removeItem("token");
    this.currentUserSubject.next(null);
    this.router.navigate(["/account/login"]);
    // this.router.navigate(['/account/login'])
  }

  uploadProfilePic(data: any) {
    return this._httpService.post(`upload`, data);
  }
}
