import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { AuthenticationService } from "../../../core/services/auth.service";
import { AuthfakeauthenticationService } from "../../../core/services/authfake.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "src/app/core/models/auth.models";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  submitted = false;
  isLoading = false;
  error = "";
  returnUrl: string;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length

  // remove this
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService
  ) {
    // remove this
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // remove this
  /**
   * Returns the current user
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    this.isLoading = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      // localStorage.setItem("currentUser", JSON.stringify(user));
      // localStorage.setItem("token", JSON.stringify(user.token));
      // this.currentUserSubject.next(user);

      // this.router.navigate(["/dashboard"]);
      // window.location.replace("");

      this.authenticationService
        .login(this.loginForm.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this.isLoading = false;
            window.location.replace("/dashboard");
            // this.router.navigate(["/dashboard"]);
          },
          (error) => {
            this.isLoading = false;
            this.error = error ? error : "";
          }
        );
    }
  }
}
