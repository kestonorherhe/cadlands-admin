import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdvancedService } from "../../tables/advancedtable/advanced.service";
import { DecimalPipe } from "@angular/common";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { StaffService } from "../../staff/staff.service";

@Component({
  selector: "app-affiliate-profile",
  templateUrl: "./affiliate-profile.component.html",
  styleUrls: ["./affiliate-profile.component.scss"],
  providers: [AdvancedService, DecimalPipe],
})

/**
 * Contacts-profile component
 */
export class AffiliateProfileComponent implements OnInit {
  isLoading = false;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  affiliateId: string;
  affiliate: any;

  constructor(
    private modalService: NgbModal,
    private readonly route: ActivatedRoute,
    private readonly staffService: StaffService
  ) {
    this.route.params.subscribe((params) => {
      this.affiliateId = params["id"];
      this.getAffiliateInfo();
    });
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Affiliate" },
      { label: "Profile", active: true },
    ];
  }

  getAffiliateInfo() {
    this.staffService.getRecords({ staffId: this.affiliateId }).subscribe(
      (response: any) => {
        this.affiliate = response;
      },
      (error) => {}
    );
  }
}
