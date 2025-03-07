import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from "@angular/router";
import { QueryService } from "src/app/core/services/query.service";
import Swal from "sweetalert2";
import { FarmerService } from "../../farmer/farmer.service";
import { TractorRequestService } from "../tractor-request.service";

@Component({
  selector: "app-request-list",
  templateUrl: "./request-list.component.html",
  styleUrls: ["./request-list.component.scss"],
})

/**
 * Contacts-profile component
 */
export class RequestListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  data = [];
  farmerList = [];
  farmLandList = [];
  serviceList = [{ name: "Ploughing" }, { name: "Harvesting" }];
  appointmentDetail;

  appointmentObj = {
    farmerId: null,
    farmlandId: null,
    service: null,
    scheduledDate: null,
  };
  document: any;

  // filter parameters
  filter = {
    startDate: "",
    endDate: "",
    customerName: "",
    paymentReference: "",
    pageNumber: 0,
    type: "",
  };
  pageable: any = {};

  @ViewChild("bookAppointmentModal")
  bookAppointmentModalRef: TemplateRef<any>;

  @ViewChild("appointmentDetailModal")
  appointmentDetailModalRef: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private readonly farmerService: FarmerService,
    private readonly tractorRequestService: TractorRequestService
  ) {
    this.viewDetail = this.viewDetail.bind(this);
  }

  showBookAppointmentModal(content: TemplateRef<any>) {
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

  onShowMakeRequestModal() {
    this.showBookAppointmentModal(this.bookAppointmentModalRef);
  }

  showAppointmentDetailModal(content: TemplateRef<any>) {
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

  onShowAppointmentDetailModal() {
    this.showAppointmentDetailModal(this.appointmentDetailModalRef);
  }

  viewDetail(evt: any) {
    console.log("🚀 ~ RequestListComponent ~ viewDetail ~ evt:", evt);
    this.appointmentDetail = evt.row.data;
    this.onShowAppointmentDetailModal();
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Contacts" },
      { label: "Profile", active: true },
    ];

    this.getAllRequest();
    this.getAllFarmers();
    this.getAllServices();
  }

  getAllRequest() {
    this.tractorRequestService.getAllRequest().subscribe(
      (response: any) => {
        // this.data = response;
        this.data = response.map((request: any) => {
          return {
            ...request,
            farmerName: `${request.farmer.firstName} ${request.farmer.lastName}`,
          };
        });
      },
      (error) => {}
    );
  }

  getAllFarmers() {
    this.farmerService.getRecords({}).subscribe(
      (response: any) => {
        this.farmerList = response.map((user: any) => {
          return {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
          };
        });
      },
      (error) => {
        console.log("🚀 ~ RequestListComponent ~ getAllUsers ~ error:", error);
      }
    );
  }

  getAllServices() {
    // this.queryService.getAllServices().subscribe(
    //   (response: any) => {
    //     console.log(
    //       "🚀 ~ AppointmentListComponent ~ getAllUsers ~ response:",
    //       response
    //     );
    //     this.serviceList = response;
    //   },
    //   (error) => {
    //     console.log(
    //       "🚀 ~ AppointmentListComponent ~ getAllUsers ~ error:",
    //       error
    //     );
    //   }
    // );
  }

  selectFarmer(evt: any) {
    console.log("🚀 ~ RequestListComponent ~ selectFarmer ~ evt:", evt);
    const farmerId = evt.id;
    this.getFarmerById(farmerId);
  }

  private getFarmerById(id: string) {
    this.farmerService.getRecords({ farmerId: id }).subscribe(
      (response: any) => {
        console.log(
          "🚀 ~ RequestListComponent ~ getFarmerById ~ response:",
          response
        );
        this.farmLandList = response.farmLands.map((farmland: any) => {
          return {
            id: farmland.id,
            name: `${farmland.farmSize} sq m, ${farmland.location}`,
          };
        });
      },
      (error) => {
        console.log("🚀 ~ RequestListComponent ~ getAllUsers ~ error:", error);
      }
    );
  }

  onBookAppointment() {
    Swal.fire({
      title: "Requesting tractor...",
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(Swal.getDenyButton());
      },
    });
    console.log(
      "🚀 ~ RequestListComponent ~ onBookAppointment ~ appointmentObj:",
      this.appointmentObj
    );

    this.tractorRequestService.requestTractor(this.appointmentObj).subscribe(
      (response: any) => {
        console.log(
          "🚀 ~ AppointmentListComponent ~ this.queryService.bookAppointment ~ response:",
          response
        );

        Swal.fire(
          "Process Successful!",
          "Tractor requested successful!",
          "success"
        );
        this.resetAppointmentForm();
        this.getAllRequest();
        this.modalService.dismissAll();
      },
      (error) => {
        Swal.fire("Process Failed!", "Tractor request failed!", "error");
        console.log(
          "🚀 ~ AppointmentListComponent ~ this.queryService.bookAppointment ~ error:",
          error
        );
      }
    );
  }

  resetAppointmentForm() {
    this.appointmentObj = {
      farmerId: null,
      farmlandId: null,
      service: null,
      scheduledDate: null,
    };
  }

  gotoPage(nextPageNumber: number): void {
    this.filter.pageNumber = nextPageNumber;
    // this.getTransactions();
  }

  searchRecord() {
    // this.getTransactionsByDateRange();
  }

  resetFilter() {
    this.filter.pageNumber = 0;
    // this.getTransactions();
  }
}
