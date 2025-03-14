import { Injectable } from "@angular/core";
import { HttpService } from "src/app/core/services/http.service";

@Injectable({ providedIn: "root" })
export class AffiliateService {
  constructor(private readonly httpService: HttpService) {}

  //   admin
  getAllAdmins({ role: role }) {
    return this.httpService.get(`admins?role=${role}`);
  }

  createRecord(data: any) {
    return this.httpService.post(`admins`, data);
  }

  processApplication(data: any) {
    return this.httpService.put(`admins/process-affiliate-application`, data);
  }
  createAgent(data: any) {
    return this.httpService.post(`admins/create-agent`, data);
  }

  getRecords(payload: { staffId?: string, role?: string, status?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.staffId) {
      params.set("staff_id", payload.staffId);
    }
    if (payload?.role) {
      params.set("role", payload.role);
    }
    if (payload?.status) {
      params.set("status", payload.status);
    }

    // Construct final URL
    const url = `admins?${params.toString()}`;

    return this.httpService.get(url);
  }
}
