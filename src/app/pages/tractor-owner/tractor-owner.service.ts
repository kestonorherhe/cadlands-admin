import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpService } from "src/app/core/services/http.service";

@Injectable({ providedIn: "root" })
export class TractorOwnerService {
  constructor(
    private http: HttpClient,
    private readonly httpService: HttpService
  ) {}

  //   admin
  getAllTractorOwners() {
    return this.httpService.get(`tractor-owner`);
  }

  createTractorOwner(data: any) {
    return this.httpService.post(`tractor-owner`, data);
  }
  createTractor(data: any) {
    return this.httpService.post(`tractor`, data);
  }

  getRecords(payload: { tractorOwnerId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.tractorOwnerId) {
      params.set("tractor_owner_id", payload.tractorOwnerId);
    }

    // Construct final URL
    const url = `tractor-owner?${params.toString()}`;

    return this.httpService.get(url);
  }

  getTractorRecords(payload: {
    tractorOwnerId?: string;
    tractorId?: string;
  }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.tractorOwnerId) {
      params.set("tractor_owner_id", payload.tractorOwnerId);
    }

    // Construct final URL
    const url = `tractor?${params.toString()}`;

    return this.httpService.get(url);
  }
}
