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

  // feature
  // getSalesCommissions(): Observable<any> {
  //   return this.http.get(
  //     `${this.envService.httpService}/application-request/sales-commissions`
  //   );
  // }

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

  getFeatureById(id: any): Observable<any> {
    return this.http.get(`${this.envService.httpService}/feature/${id}`);
  }

  createFeature(data: any) {
    return this.http.post(`${this.envService.httpService}/feature`, data).pipe(
      map((res: any) => {
        console.log("create user ::", res);
        return res.data;
      })
    );
  }

  updateFeature(data: any) {
    return this.http.put(`${this.envService.httpService}/feature`, data).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
}
