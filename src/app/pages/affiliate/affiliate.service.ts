import { Injectable } from "@angular/core";
import { HttpService } from "src/app/core/services/http.service";

@Injectable({ providedIn: "root" })
export class AffiliateService {
  constructor(private readonly httpService: HttpService) {}

  //   admin
  getAllAdmins({ role: role }) {
    return this.httpService.get(`admins?role=${role}`);
  }

  getProfile() {
    return this.httpService.get(`admins/my-profile`);
  }

  createRecord(data: any) {
    return this.httpService.post(`admins`, data);
  }

  processApplication(data: any) {
    return this.httpService.put(`admins/process-affiliate-application`, data);
  }
  addBankAccount(data: any) {
    return this.httpService.post(`admins/add-bank-account`, data);
  }
  getAffiliateBanks() {
    return this.httpService.get(`admins/get-bank-accounts`);
  }

  getRecords(payload: { staffId?: string; role?: string; status?: string }) {
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
