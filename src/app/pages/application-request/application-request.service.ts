import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { EnvService } from "src/app/core/services/env.service";
import { HttpService } from "src/app/core/services/http.service";

@Injectable({ providedIn: "root" })
export class ApplicationRequestService {
  constructor(
    private http: HttpClient,
    private readonly httpService: HttpService,
    private envService: EnvService
  ) {}

  uploadFile(data: any) {
    return this.http.post(`${this.envService.httpService}/upload`, data).pipe(
      map((res: any) => {
        console.log("create user ::", res);
        return res.secure_url;
      })
    );
  }

  uploadImage(file: File): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);

    return new Promise((resolve, reject) => {
      this.uploadFile(formData).subscribe(
        (response: any) => {
          resolve(response);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  uploadFiles(data: any) {
    return this.http
      .post(`${this.envService.httpService}/upload-files`, data)
      .pipe(
        map((res: any) => {
          console.log("create user ::", res);
          return res;
        })
      );
  }

  uploadImages(formData: FormData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.uploadFiles(formData).subscribe(
        (response: any) => {
          resolve(response);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  // estate routes
  createApplicationRequest(data: any) {
    return this.httpService.post(`application-request`, data);
  }

  processApplicationRequest(data: any) {
    return this.httpService.put(
      `application-request/process-application`,
      data
    );
  }

  confirmFullPayment(data: any) {
    return this.httpService.put(
      `application-request/confirm-full-payment`,
      data
    );
  }

  makePartPayment(data: any) {
    return this.httpService.put(
      `application-request/confirm-part-payment`,
      data
    );
  }

  updateEstate(data: any) {
    return this.httpService.post(`application-request`, data);
  }

  getAllApplicationRequests(payload: {
    status?: string;
    paymentStatus?: string;
  }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.status) {
      params.set("status", payload.status);
    }

    // Construct final URL
    const url = `application-request?${params.toString()}`;

    return this.httpService.get(url);
  }
}
