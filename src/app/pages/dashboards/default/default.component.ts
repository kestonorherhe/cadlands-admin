import { Component, OnInit } from "@angular/core";
import { ApplicationRequestService } from "../../application-request/application-request.service";
import { PropertyService } from "../../property/property.service";
import { AffiliateService } from "../../affiliate/affiliate.service";

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

  affiliateCount: number = 0;
  estateCount: number = 0;
  propertyCount: number = 0;
  totalApplicationCount: number = 0;

  isVisible: string;
  isActive: string;
  constructor(
    private readonly propertyService: PropertyService,
    private readonly affiliateService: AffiliateService,
    private readonly applicationRequestService: ApplicationRequestService
  ) {}

  ngOnInit() {
    this.first_name = JSON.parse(
      localStorage.getItem("currentUser")
    ).first_name;
    this.user = JSON.parse(localStorage.getItem("currentUser"));

    // this.farmerService.getRecords({}).subscribe(
    //   (response: any) => {
    //     this.farmerCount = response.length;
    //   },
    //   (error) => {}
    // );
    this.getAllApplicationRequests();
    this.getAllEstate();
    this.getAllProperties();
    this.getAllAffiliate();
  }

  getAllEstate() {
    this.propertyService.getAllEstate({}).subscribe(
      (response: any) => {
        this.estateCount = response.data.estates.length;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }
  getAllProperties() {
    this.propertyService.getAllProperties({}).subscribe(
      (response: any) => {
        this.propertyCount = response.data.properties.length;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  getAllAffiliate() {
    this.affiliateService.getRecords({ role: "affiliate" }).subscribe(
      (response: any) => {
        this.affiliateCount = response.length;
      },
      (error) => {}
    );
  }

  getAllApplicationRequests() {
    this.isLoading = true;
    this.applicationRequestService.getAllApplicationRequests({}).subscribe(
      (response: any) => {
        this.data = response.data;
        this.totalApplicationCount = response.data.applications.length;
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
