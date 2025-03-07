import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EventService } from "../../../core/services/event.service";
import { QueryService } from "src/app/core/services/query.service";
import { StaffService } from "../../staff/staff.service";
import { FarmerService } from "../../farmer/farmer.service";
import { TractorOwnerService } from "../../tractor-owner/tractor-owner.service";

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
  // providers: [AdvancedService, DecimalPipe],
})
export class DefaultComponent implements OnInit {
  isLoading = false;
  data = [];
  first_name = "";
  user;
  adminCount = 0;
  agentCount = 0;
  farmerCount = 0;
  appointments;
  appointmentDetail;
  tractorOwnerCount = 0;
  tractorCount = 0;

  isVisible: string;
  isActive: string;

  @ViewChild("appointmentDetailModal")
  appointmentDetailModalRef: TemplateRef<any>;
  constructor(
    private readonly queryService: QueryService,
    private modalService: NgbModal,
    private eventService: EventService,
    private staffService: StaffService,
    private farmerService: FarmerService,
    private tractorOwnerService: TractorOwnerService
  ) {
    this.viewDetail = this.viewDetail.bind(this);
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
    console.log(
      "🚀 ~ AppointmentListComponent ~ viewDetail ~ evt:",
      evt.row.data
    );
    this.appointmentDetail = evt.row.data;
    this.onShowAppointmentDetailModal();
  }

  ngOnInit() {
    /**
     * horizontal-vertical layput set
     */
    const attribute = document.body.getAttribute("data-layout");
    this.isVisible = attribute;

    this.first_name = JSON.parse(
      localStorage.getItem("currentUser")
    ).first_name;
    this.user = JSON.parse(localStorage.getItem("currentUser"));

    const vertical = document.getElementById("layout-vertical");
    if (vertical != null) {
      vertical.setAttribute("checked", "true");
    }
    if (attribute == "horizontal") {
      const horizontal = document.getElementById("layout-horizontal");
      if (horizontal != null) {
        horizontal.setAttribute("checked", "true");
        console.log(horizontal);
      }
    }

    /**
     * Fetches the data
     */
    // this.fetchData();

    this.staffService.getAllAdmins({ role: "admin" }).subscribe(
      (response: any) => {
        console.log("🚀 ~ DefaultComponent ~ ngOnInit ~ response:", response);
        this.adminCount = response.length;
      },
      (error) => {}
    );
    this.staffService.getAllAdmins({ role: "agent" }).subscribe(
      (response: any) => {
        this.agentCount = response.length;
      },
      (error) => {}
    );

    this.farmerService.getRecords({}).subscribe(
      (response: any) => {
        this.farmerCount = response.length;
      },
      (error) => {}
    );

    this.tractorOwnerService.getRecords({}).subscribe(
      (response: any) => {
        this.tractorOwnerCount = response.length;
      },
      (error) => {}
    );

    this.tractorOwnerService.getTractorRecords({}).subscribe(
      (response: any) => {
        this.tractorCount = response.length;
      },
      (error) => {}
    );
  }

  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout: string) {
    this.eventService.broadcast("changeLayout", layout);
  }
}
