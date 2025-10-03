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
  updateBankAccount(data: any) {
    return this.httpService.put(`admins/update-bank-account`, data);
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
  getAffiliateEarningsReport() {
    return this.httpService.get(`admins/affiliate-earnings`);
  }
  upgradeAccount() {
    return this.httpService.post(`subscription-request/upgrade-account`, {});
  }
  updateAffiliate(data: any) {
    return this.httpService.put(`admins/update-affiliate`, data);
  }

  updateAffiliateNok(data: any) {
    return this.httpService.put(`admins/update-affiliate-nok`, data);
  }

  getAllSubscriptionRequests(payload: {
    approvalStatus?: string;
    paymentStatus?: string;
  }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.approvalStatus) {
      params.set("approval_status", payload.approvalStatus);
    }
    if (payload?.paymentStatus) {
      params.set("payment_status", payload.paymentStatus);
    }

    // Construct final URL
    const url = `subscription-request?${params.toString()}`;

    return this.httpService.get(url);
  }

  getAllSubscriptions(payload: {
    approvalStatus?: string;
    paymentStatus?: string;
  }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.approvalStatus) {
      params.set("approval_status", payload.approvalStatus);
    }
    if (payload?.paymentStatus) {
      params.set("payment_status", payload.paymentStatus);
    }

    // Construct final URL
    const url = `subscription?${params.toString()}`;

    return this.httpService.get(url);
  }

  getMySubscriptionRequests() {
    return this.httpService.get(
      `subscription-request/my-subscription-requests`
    );
  }
  getMySubscriptions() {
    return this.httpService.get(`subscription/my-subscriptions`);
  }

  confirmPayment(requestId: number) {
    return this.httpService.put(`subscription-request/confirm-payment`, {
      id: requestId,
    });
  }

  cancelRequest(requestId: number) {
    return this.httpService.put(`subscription-request/cancel-request`, {
      id: requestId,
    });
  }

  resendEmail(email: any) {
    // return this.http
    //   .get(
    //     `${this.envService.apiService}/`
    //   )
    //   .pipe(
    //     map((res: any) => {
    //       return res.data;
    //     })
    //   );

    return this.httpService.get(`auth/resend-onboarding-email/${email}`);
  }
}
