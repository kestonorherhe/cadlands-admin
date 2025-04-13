import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { EnvService } from "src/app/core/services/env.service";

@Injectable({ providedIn: "root" })
export class SalesCommissionService {
  constructor(
    private http: HttpClient,
    private readonly envService: EnvService
  ) {}

  getSalesCommissions(payload: { status?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.status) {
      params.set("status", payload.status);
    }

    // Construct final URL
    const url = `${
      this.envService.httpService
    }/application-request/sales-commissions?${params.toString()}`;

    return this.http.get(url);
  }

  getMySalesHistory(payload: { status?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.status) {
      params.set("status", payload.status);
    }

    // Construct final URL
    const url = `${
      this.envService.httpService
    }/application-request/my-sales-history?${params.toString()}`;

    return this.http.get(url);
  }

  getMyAffiliateSalesHistory(payload: { status?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.status) {
      params.set("status", payload.status);
    }

    // Construct final URL
    const url = `${
      this.envService.httpService
    }/application-request/my-affiliate-sales-history?${params.toString()}`;

    return this.http.get(url);
  }

  // createFeature(data: any) {
  //   return this.http.post(`${this.envService.httpService}/feature`, data).pipe(
  //     map((res: any) => {
  //       console.log("create user ::", res);
  //       return res.data;
  //     })
  //   );
  // }

  getMyCommissions(payload: { status?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.status) {
      params.set("status", payload.status);
    }

    // Construct final URL
    const url = `${
      this.envService.httpService
    }/application-request/my-commissions?${params.toString()}`;

    return this.http.get(url);
  }

  getMyDirectSalesCommissions(payload: { status?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.status) {
      params.set("status", payload.status);
    }

    // Construct final URL
    const url = `${
      this.envService.httpService
    }/application-request/my-direct-sales-commissions?${params.toString()}`;

    return this.http.get(url);
  }

  getMyIndirectSalesCommissions(payload: { status?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.status) {
      params.set("status", payload.status);
    }

    // Construct final URL
    const url = `${
      this.envService.httpService
    }/application-request/my-indirect-sales-commissions?${params.toString()}`;

    return this.http.get(url);
  }

  getWithdrawalRequests(payload: { status?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.status) {
      params.set("status", payload.status);
    }

    // Construct final URL
    const url = `${
      this.envService.httpService
    }/affiliate-commission-withdrawal?${params.toString()}`;

    return this.http.get(url);
  }

  getMyWithdrawals(payload: { status?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.status) {
      params.set("status", payload.status);
    }

    // Construct final URL
    const url = `${
      this.envService.httpService
    }/affiliate-commission-withdrawal/my-withdrawals?${params.toString()}`;

    return this.http.get(url);
  }

  createWithdrawal(data: any) {
    return this.http
      .post(
        `${this.envService.httpService}/affiliate-commission-withdrawal`,
        data
      )
      .pipe(
        map((res: any) => {
          console.log("create user ::", res);
          return res.data;
        })
      );
  }

  updateWithdrawal(data: any) {
    return this.http
      .put(
        `${this.envService.httpService}/affiliate-commission-withdrawal`,
        data
      )
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  processWithdrawal(requestId: any) {
    return this.http
      .put(
        `${this.envService.httpService}/affiliate-commission-withdrawal/process-application`,
        { id: requestId }
      )
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  cancelWithdrawal(requestId: any) {
    return this.http
      .put(
        `${this.envService.httpService}/affiliate-commission-withdrawal/cancel-withdrawal`,
        { id: requestId }
      )
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  getAllSubscriptionBonuses(payload: { status?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.status) {
      params.set("approval_status", payload.status);
    }

    // Construct final URL
    const url = `${
      this.envService.httpService
    }/subscription-request/subscription-bonuses?${params.toString()}`;

    return this.http.get(url);
  }

  getMySubscriptionBonuses(payload: { status?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.status) {
      params.set("status", payload.status);
    }

    // Construct final URL
    const url = `${
      this.envService.httpService
    }/subscription-request/my-subscription-bonuses?${params.toString()}`;

    return this.http.get(url);
  }

  getAllBonusWithdrawalRequests(payload: { status?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.status) {
      params.set("approval_status", payload.status);
    }

    // Construct final URL
    const url = `${
      this.envService.httpService
    }/subscription-bonus-withdrawal?${params.toString()}`;

    return this.http.get(url);
  }

  getMyBonusWithdrawals(payload: { status?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.status) {
      params.set("status", payload.status);
    }

    // Construct final URL
    const url = `${
      this.envService.httpService
    }/subscription-bonus-withdrawal/my-withdrawals?${params.toString()}`;

    return this.http.get(url);
  }

  createBonusWithdrawalRequest(data: any) {
    return this.http
      .post(
        `${this.envService.httpService}/subscription-bonus-withdrawal`,
        data
      )
      .pipe(
        map((res: any) => {
          console.log("create user ::", res);
          return res.data;
        })
      );
  }

  updateBonusWithdrawal(data: any) {
    return this.http
      .put(`${this.envService.httpService}/subscription-bonus-withdrawal`, data)
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  processBonusWithdrawal(requestId: any) {
    return this.http
      .put(
        `${this.envService.httpService}/subscription-bonus-withdrawal/process-application`,
        { id: requestId }
      )
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  cancelBonusWithdrawal(requestId: any) {
    return this.http
      .put(
        `${this.envService.httpService}/subscription-bonus-withdrawal/cancel-withdrawal`,
        { id: requestId }
      )
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }
}
