import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdvancedService } from "../../tables/advancedtable/advanced.service";
import { DecimalPipe } from "@angular/common";
import { StaffService } from "../staff.service";

@Component({
  selector: "app-agent-profile",
  templateUrl: "./agent-profile.component.html",
  styleUrls: ["./agent-profile.component.scss"],
  providers: [AdvancedService, DecimalPipe],
})

/**
 * Contacts-profile component
 */
export class AgentProfileComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  staffId: string;
  staff: any;
  data = []

  constructor(
    private readonly route: ActivatedRoute,
    private readonly staffService: StaffService
  ) {
    this.route.params.subscribe((params) => {
      this.staffId = params["id"];
      this.getUser();
    });

    this.viewRecord = this.viewRecord.bind(this);
  }

  viewRecord(evt: any) {
    console.log("🚀 ~ FarmerListComponent ~ viewRecord ~ evt:", evt);
    const id = evt.row.data.id;
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Staff" },
      { label: "Profile", active: true },
    ];
  }

  getUser() {
    this.staffService.getRecords({ staffId: this.staffId }).subscribe(
      (response: any) => {
        console.log(
          "🚀 ~ FarmerProfileComponent ~ getUser ~ response:",
          response
        );
        this.staff = response;
      },
      (error) => {
        console.log("🚀 ~ FarmerProfileComponent ~ getUser ~ error:", error);
      }
    );
  }
}
