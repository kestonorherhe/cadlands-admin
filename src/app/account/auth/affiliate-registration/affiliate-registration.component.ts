import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { AuthenticationService } from "../../../core/services/auth.service";
import { OwlOptions } from "ngx-owl-carousel-o";
import { first } from "rxjs/operators";
import Swal from "sweetalert2";

@Component({
  selector: "app-affiliate-registration",
  templateUrl: "./affiliate-registration.component.html",
  styleUrls: ["./affiliate-registration.component.scss"],
})
/**
 * Login-2 component
 */
export class AffiliateRegistrationComponent implements OnInit {
  constructor(
    private formBuilder: UntypedFormBuilder,
    private authenticationService: AuthenticationService
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
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      address: [null, []],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
      referralCode: [null, [Validators.minLength(11)]],
    });
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
        .affiliateRegistration(this.loginForm.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this.isLoggingIn = false;
            Swal.fire("success", "Registration successful");
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
