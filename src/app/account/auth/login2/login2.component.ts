import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { AuthenticationService } from "../../../core/services/auth.service";
import { AuthfakeauthenticationService } from "../../../core/services/authfake.service";
import { OwlOptions } from "ngx-owl-carousel-o";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
  selector: "app-login2",
  templateUrl: "./login2.component.html",
  styleUrls: ["./login2.component.scss"],
})
/**
 * Login-2 component
 */
export class Login2Component implements OnInit {
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService
  ) {}
  loginForm: UntypedFormGroup;
  submitted = false;
  error = "";
  showErr = false;
  isLoggingIn = false;
  returnUrl: string;
  fieldTextType!: boolean;

  // set the currenr year
  year: number = new Date().getFullYear();

  ngOnInit(): void {
    document.body.classList.add("auth-body-bg");
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    // this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "";
  }

  carouselOption: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
    responsive: {
      680: {
        items: 1,
      },
    },
  };

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit() {
    this.showErr = false;
    this.isLoggingIn = true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authenticationService
        .login(this.loginForm.value)
        .pipe(first())
        .subscribe(
          (data) => {
            console.log("🚀 ~ Login2Component ~ onSubmit ~ data:", data);
            this.isLoggingIn = false;

            if (data.data.role && data.data.role == "admin") {
              window.location.replace("/dashboard");
            } else if (data.data.role && data.data.role == "super_admin") {
              window.location.replace("/dashboard");
            } else if (data.data.role && data.data.role == "affiliate") {
              window.location.replace("/my-dashboard");
            } 
            // if (data.verxid.status == 1) {
            //   console.log("we are here!!!!");
            //   // this.router.navigate([""]);
            //   window.location.replace('');
            // } else if (data.verxid.status == 0) {
            //   console.log("error message ::", data.verxid.message)
            //   this.error = data.verxid.message;
            //   this.showErr = true;
            // }
          },
          (error) => {
            this.isLoggingIn = false;
            console.log("error ::", error);
            this.error = error ? error : "";
          }
        );
    }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
