import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

import { AuthenticationService } from "../../../core/services/auth.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  signupForm: UntypedFormGroup;
  submitted = false;
  error = "";
  successmsg = false;
  isLoading = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;
    this.isLoading = true;
    const userRegisterDto = this.signupForm.value;
    userRegisterDto.userType = 'owner';
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    } else {
      this.authenticationService
        .register(this.signupForm.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this.isLoading = false;
            this.successmsg = true;
            if (this.successmsg) {
              this.router.navigate(["/account/login"]);
            }
          },
          (error) => {
            this.isLoading = false;
            this.error = error ? error : "";
          }
        );
    }
  }
}
