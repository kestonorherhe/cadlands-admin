import { Component, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { ApplicationRequestService } from "../application-request.service";
import { PropertyService } from "../../property/property.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-pending-allocation-list",
  templateUrl: "./pending-allocation-list.component.html",
  styleUrls: ["./pending-allocation-list.component.scss"],
})
export class PendingAllocationListComponent implements OnInit, OnDestroy {
  isLoading = false;
  data: any;
  detailsVisible: boolean[] = [];
  optionList = [
    { id: "Approved", name: "Approve" },
    { id: "Declined", name: "Decline" },
  ];

  properties: any[] = [];
  filteredProperties: any[] = [];

  isLoadingProperties = false;
  propertyInput$ = new Subject<string>();
  allocatingDetails: Set<number> = new Set();
  private destroy$ = new Subject<void>();

  items: any[] = []; // Your list of items
  // New cache for filtered properties
  filteredPropertiesMap: { [key: string]: any[] } = {};
  constructor(
    private modalService: NgbModal,
    private readonly applicationRequestService: ApplicationRequestService,
    private readonly propertyService: PropertyService
  ) {}

  toggleDetails(index: number): void {
    this.detailsVisible[index] = !this.detailsVisible[index];
  }
  ngOnInit() {
    this.getAllApplicationRequests();
    this.loadProperties();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Update filtered properties when inputs change
    if (changes.properties || changes.items) {
      this.updateFilteredProperties();
    }
  }

  getAllApplicationRequests() {
    this.isLoading = true;
    this.applicationRequestService
      .getApplicationPendingAllocation({})
      .subscribe(
        (response: any) => {
          this.data = response.data;
          this.data.applications.forEach((app) => {
            app.requestDetails.forEach((detail) => {
              detail.selectedPropertyId = null; // Ensure this property exists
            });
          });
          // Initialize visibility array for details
          this.detailsVisible = new Array(
            this.data?.applications?.length || 0
          ).fill(false);
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProperties(): void {
    this.isLoadingProperties = true;
    this.propertyService.getAllProperties({ status: "Available" }).subscribe(
      (response: any) => {
        this.isLoadingProperties = false;
        this.properties = response.data.properties;
        this.isLoadingProperties = false;
        this.updateFilteredProperties();
      },
      (error) => {
        this.isLoadingProperties = false;
      }
    );
  }

  filterProperties(data: any): any[] {
    // Generate a unique key for this data combination
    const key = `${data?.propertyTemplate?.id}-${data?.propertyPurpose?.id}-${data?.propertyLocation?.id}`;

    // Return cached result if available
    if (this.filteredPropertiesMap[key]) {
      return this.filteredPropertiesMap[key];
    }

    if (!data?.propertyTemplate?.id || !this.properties?.length) {
      this.filteredPropertiesMap[key] = [];
      return [];
    }

    const propertyTemplateId = data.propertyTemplate.id;
    const propertyPurposeId = data.propertyPurpose?.id;
    const propertyLocationId = data.propertyLocation?.id;

    const filtered = this.properties.filter(
      (property: any) =>
        property.propertyTemplate.id === propertyTemplateId &&
        (!propertyPurposeId ||
          property.propertyPurpose.id === propertyPurposeId) &&
        (!propertyLocationId ||
          property.propertyLocation.id === propertyLocationId)
    );

    // Cache the result
    this.filteredPropertiesMap[key] = filtered;
    return filtered;
  }

  // New method to get filtered properties for a specific item
  getFilteredPropertiesForItem(item: any): any[] {
    const key = `${item?.propertyTemplate?.id}-${item?.propertyPurpose?.id}-${item?.propertyLocation?.id}`;

    // If not in cache, calculate and store
    if (!this.filteredPropertiesMap[key]) {
      this.filteredPropertiesMap[key] = this.filterProperties(item);
    }

    return this.filteredPropertiesMap[key];
  }

  // Method to update all filtered properties
  updateFilteredProperties() {
    // Clear cache
    this.filteredPropertiesMap = {};

    // Pre-filter properties for each item
    if (this.items && this.items.length) {
      this.items.forEach((item) => {
        const key = `${item?.propertyTemplate?.id}-${item?.propertyPurpose?.id}-${item?.propertyLocation?.id}`;
        this.filteredPropertiesMap[key] = this.filterProperties(item);
      });
    }
  }

  getPropertyPlaceholder(item: any, detail: any): string {
    if (detail.approvalStatus !== "Approved") {
      return "Approval required";
    }
    if (detail.allocationDate) {
      return "Already allocated";
    }
    return "Select property";
  }

  isAllocating(detailId: number): boolean {
    return this.allocatingDetails.has(detailId);
  }

  allocatePlot(detail: any) {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to confirm payment for this application?",
      showDenyButton: true,
      allowOutsideClick: false,
      confirmButtonText: "Yes, confirm payment!",
      confirmButtonColor: "#1B84FF",
      denyButtonText: `No, return`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.allocatePlotFn(detail);
      }
    });
  }

  async allocatePlotFn(detail: any) {
    this.allocatingDetails.add(detail.id);

    const data = {
      detailId: detail.id,
      propertyId: detail.selectedPropertyId,
    };
    this.applicationRequestService.allocatePlot(data).subscribe(
      (response: any) => {
        this.allocatingDetails.delete(detail.id);
        Swal.fire(
          "Process Successful!",
          "Plot allocated successfully!",
          "success"
        );
        this.getAllApplicationRequests();
        this.loadProperties();
      },
      (error) => {
        this.allocatingDetails.delete(detail.id);
        Swal.fire("Process Failed!", "Failed to allocate plot", "error");
      }
    );
  }
}
