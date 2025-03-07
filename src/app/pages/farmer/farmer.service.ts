import { Injectable } from "@angular/core";
import { HttpService } from "src/app/core/services/http.service";

@Injectable({ providedIn: "root" })
export class FarmerService {
  constructor(private readonly httpService: HttpService) {}

  getRecords(payload: { farmerId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.farmerId) {
      params.set("farmer_id", payload.farmerId);
    }

    // Construct final URL
    const url = `farmers?${params.toString()}`;

    return this.httpService.get(url);
    // return this.httpService.get("farmers");
  }

  createRecord(data: any) {
    return this.httpService.post("farmers", data);
  }

  updateRecord(data: any) {
    return this.httpService.put("farmers", data);
  }

  createFarmland(data: any) {
    return this.httpService.post("farm-land", data);
  }
}
