import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EventService } from "../../../core/services/event.service";
import { QueryService } from "src/app/core/services/query.service";
import { StaffService } from "../../staff/staff.service";
import { ApplicationRequestService } from "../../application-request/application-request.service";

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
  // providers: [AdvancedService, DecimalPipe],
})
export class DefaultComponent implements OnInit {
  isLoading = false;
  data: any;
  first_name = "";
  user;
  appointments;
  appointmentDetail;

  isVisible: string;
  isActive: string;

  // @ViewChild("appointmentDetailModal")
  // appointmentDetailModalRef: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private eventService: EventService,
    private readonly applicationRequestService: ApplicationRequestService
  ) {}

  // showAppointmentDetailModal(content: TemplateRef<any>) {
  //   this.modalService
  //     .open(content, {
  //       centered: true,
  //       size: "lg",
  //       animation: true,
  //       backdrop: "static",
  //       keyboard: false,
  //     })
  //     .result.then((result) => {
  //       console.log("Modal closed" + result);
  //     })
  //     .catch((res) => {});
  // }

  // onShowAppointmentDetailModal() {
  //   this.showAppointmentDetailModal(this.appointmentDetailModalRef);
  // }

  // viewDetail(evt: any) {
  //   console.log(
  //     "🚀 ~ AppointmentListComponent ~ viewDetail ~ evt:",
  //     evt.row.data
  //   );
  //   this.appointmentDetail = evt.row.data;
  //   this.onShowAppointmentDetailModal();
  // }

  ngOnInit() {
    this.first_name = JSON.parse(
      localStorage.getItem("currentUser")
    ).first_name;
    this.user = JSON.parse(localStorage.getItem("currentUser"));

    // const vertical = document.getElementById("layout-vertical");
    // if (vertical != null) {
    //   vertical.setAttribute("checked", "true");
    // }
    // if (attribute == "horizontal") {
    //   const horizontal = document.getElementById("layout-horizontal");
    //   if (horizontal != null) {
    //     horizontal.setAttribute("checked", "true");
    //     console.log(horizontal);
    //   }
    // }

    // this.farmerService.getRecords({}).subscribe(
    //   (response: any) => {
    //     this.farmerCount = response.length;
    //   },
    //   (error) => {}
    // );
    this.getAllApplicationRequests();
  }

  getAllApplicationRequests() {
    this.isLoading = true;
    this.applicationRequestService.getAllApplicationRequests({}).subscribe(
      (response: any) => {
        this.data = response.data;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  // changeLayout(layout: string) {
  //   this.eventService.broadcast("changeLayout", layout);
  // }
}
