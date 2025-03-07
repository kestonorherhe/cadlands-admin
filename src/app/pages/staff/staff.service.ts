import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpService } from "src/app/core/services/http.service";

@Injectable({ providedIn: "root" })
export class StaffService {
  constructor(
    private http: HttpClient,
    private readonly httpService: HttpService
  ) {}

  //   admin
  getAllAdmins({role: role}) {
    return this.httpService.get(`admins?role=${role}`);
  }

  createRecord(data: any) {
    return this.httpService.post(`admins`, data);
  }
  createAgent(data: any) {
    return this.httpService.post(`admins/create-agent`, data);
  }

  getRecords(payload: { staffId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.staffId) {
      params.set("staff_id", payload.staffId);
    }

    // Construct final URL
    const url = `admins?${params.toString()}`;

    return this.httpService.get(url);
  }
}
