import { Component, OnInit } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthenticationService } from "../../../core/services/auth.service";
import { first } from "rxjs/operators";
import Swal from "sweetalert2";

@Component({
  selector: "app-recoverpwd2",
  templateUrl: "./recoverpwd2.component.html",
  styleUrls: ["./recoverpwd2.component.scss"],
})
export class Recoverpwd2Component implements OnInit {
  // set the currenr year
  year: number = new Date().getFullYear();

  resetForm: UntypedFormGroup;
  submitted = false;
  error = "";
  success = "";
  loading = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.resetForm.controls;
  }

  /**
   * On submit form
   */
  onSubmit() {
    this.success = "";
    this.submitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }

    this.authenticationService
      .resetPassword(this.resetForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log("🚀 ~ Login2Component ~ onSubmit ~ data:", data);
          this.loading = false;
          Swal.fire(
            data.message,
            "A password reset link has been sent to your email",
            "success"
          ).then(() => {
            window.location.replace("/account/login");
          });
        },
        (error) => {
          this.loading = false;
          console.log("error ::", error);
          this.error = error ? error : "";
        }
      );
  }
}
