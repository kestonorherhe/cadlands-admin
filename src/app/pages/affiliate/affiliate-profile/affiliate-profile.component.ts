import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdvancedService } from "../../tables/advancedtable/advanced.service";
import { DecimalPipe } from "@angular/common";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";

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
  farmerId: string;
  farmer: any;
  data = [];
  obj = {
    farmerId: null,
    location: null,
    farmSize: null,
  };

  @ViewChild("createFarmlandModal")
  createFarmlandModalRef: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private readonly route: ActivatedRoute,
  ) {
    this.route.params.subscribe((params) => {
      this.farmerId = params["id"];
      this.getUser();
    });

    this.viewRecord = this.viewRecord.bind(this);
  }

  viewRecord(evt: any) {
    console.log("🚀 ~ FarmerListComponent ~ viewRecord ~ evt:", evt);
    const id = evt.row.data.id;
    // this._router.navigate(["farmers", id]);
  }

  showCreateRecordModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, {
        centered: true,
        size: "lg",
        animation: true,
        backdrop: "static",
        keyboard: false,
      })
      .result.then((result) => {
        console.log("Modal closed" + result);
      })
      .catch((res) => {});
  }

  onShowCreateRecordModal() {
    this.showCreateRecordModal(this.createFarmlandModalRef);
  }

  closeModal() {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you would like to cancel?",
      showDenyButton: true,
      allowOutsideClick: false,
      confirmButtonText: "Yes, cancel it!",
      confirmButtonColor: "#1B84FF",
      denyButtonText: `No, return`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.resetForm();
        this.modalService.dismissAll();
      }
    });
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Farmers" },
      { label: "Profile", active: true },
    ];
  }

  getUser() {
    // this.farmerService.getRecords({ farmerId: this.farmerId }).subscribe(
    //   (response: any) => {
    //     console.log(
    //       "🚀 ~ FarmerProfileComponent ~ getUser ~ response:",
    //       response
    //     );
    //     this.farmer = response;
    //   },
    //   (error) => {
    //     console.log("🚀 ~ FarmerProfileComponent ~ getUser ~ error:", error);
    //   }
    // );
  }

  resetForm() {
    this.obj = {
      farmerId: null,
      location: null,
      farmSize: null,
    };
  }

  onSubmit() {
    Swal.fire({
      title: "Capturing record...",
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(Swal.getDenyButton());
      },
    });

    const data = {
      ...this.obj,
      farmerId: +this.farmerId,
    };
    // this.farmerService.createFarmland(data).subscribe(
    //   (response: any) => {
    //     console.log("🚀 ~ StaffListComponent ~ onSubmit ~ response:", response);
    //     Swal.fire(
    //       "Process Successful!",
    //       "Tractor Owner successfully created!",
    //       "success"
    //     );
    //     this.modalService.dismissAll();
    //     this.resetForm();
    //     this.getUser();
    //   },
    //   (error) => {
    //     Swal.fire("Process Failed!", "Failed to create tractor owner", "error");
    //   }
    // );
  }
}
