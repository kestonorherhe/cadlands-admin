import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { User } from "../models/auth.models";
import { Router } from "@angular/router";
import { HttpService } from "./http.service";
import { EnvService } from "./env.service";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  user: User;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private readonly _httpService: HttpService,
    private router: Router,
    private envService: EnvService
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
      .post<any>(`${this.envService.httpService}/auth/admin-login`, credential)
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
        `${this.envService.httpService}/admins/affiliate-registration`,
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
      .post<any>(`${this.envService.httpService}auth/register`, registerDto)
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
  forgotPassword(data) {
    console.log("resetting password...");
    return this.http
      .post<any>(`${this.envService.httpService}/auth/forgot-password`, data)
      .pipe(
        map((response) => {
          console.log("🚀 ~ AuthenticationService ~ map ~ response:", response);
          return response;
        })
      );
  }

  resetPassword(data, token) {
    console.log("resetting password...");
    return this.http
      .post<any>(`${this.envService.httpService}/auth/reset/${token}`, data)
      .pipe(
        map((response) => {
          console.log("🚀 ~ AuthenticationService ~ map ~ response:", response);
          return response;
        })
      );
  }

  updatePassword(data) {
    return this.http
      .put<any>(`${this.envService.httpService}/auth/update-password`, data)
      .pipe(
        map((response) => {
          console.log("🚀 ~ AuthenticationService ~ map ~ response:", response);
          return response;
        })
      );
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
