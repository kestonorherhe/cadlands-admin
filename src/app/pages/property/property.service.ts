import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { EnvService } from "src/app/core/services/env.service";
import { HttpService } from "src/app/core/services/http.service";

@Injectable({ providedIn: "root" })
export class PropertyService {
  constructor(
    private http: HttpClient,
    private readonly httpService: HttpService,
    private envService: EnvService
  ) {}

  // property prices observables
  private propertyPricesSubject = new BehaviorSubject<any | []>([]);
  get propertyPrices$() {
    return this.propertyPricesSubject.asObservable();
  }
  setPropertyPrices(propertyPrices: any) {
    this.propertyPricesSubject.next(propertyPrices);
  }

  uploadFile(data: any) {
    return this.http.post(`${this.envService.httpService}/upload`, data).pipe(
      map((res: any) => {
        return res.secure_url;
      })
    );
  }

  uploadImage(formData: FormData): Promise<any> {
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
          return res;
        })
      );
  }

  uploadImages(formData: FormData): Promise<any> {
    // const formData = new FormData();
    // formData.append("files", file);

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
  createEstate(data: any) {
    return this.httpService.post(`estate`, data);
  }
  updateEstate(data: any) {
    return this.httpService.put(`estate`, data);
  }

  getAllEstate(payload: { estateId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.estateId) {
      params.set("estate_id", payload.estateId);
    }

    // Construct final URL
    const url = `estate?${params.toString()}`;

    return this.httpService.get(url);
  }

  getAllOtherEstateListings(payload: { estateId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.estateId) {
      params.set("estate_id", payload.estateId);
    }

    // Construct final URL
    const url = `estate/other-listings?${params.toString()}`;

    return this.httpService.get(url);
  }

  getAllDirectSaleCommissions(payload: { estateId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.estateId) {
      params.set("estate_id", payload.estateId);
    }

    // Construct final URL
    const url = `estate/direct-sale-commission?${params.toString()}`;

    return this.httpService.get(url);
  }

  createDirectSaleCommission(data: any) {
    return this.httpService.post(`estate/direct-sale-commission`, data);
  }

  getAllIndirectSaleCommissions(payload: { estateId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.estateId) {
      params.set("estate_id", payload.estateId);
    }

    // Construct final URL
    const url = `estate/indirect-sale-commission?${params.toString()}`;

    return this.httpService.get(url);
  }

  createIndirectSaleCommission(data: any) {
    return this.httpService.post(`estate/indirect-sale-commission`, data);
  }

  // proeprty templates
  getAllPropertyTemplates(payload: {
    estateId?: string;
    propertyTemplateId?: string;
  }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.estateId) {
      params.set("estate_id", payload.estateId);
    }
    if (payload?.propertyTemplateId) {
      params.set("property_template_id", payload.propertyTemplateId);
    }

    // Construct final URL
    const url = `property-template/all-property-templates?${params.toString()}`;

    return this.httpService.get(url);
  }

  createPropertyTemplate(data: any) {
    return this.httpService.post("property-template", data);
  }

  updatePropertyTemplate(data: any) {
    return this.httpService.put("property-template", data);
  }

  updatePropertyTemplatePrice(data: any) {
    return this.httpService.post(
      "property-template/update-property-template-price",
      data
    );
  }

  // property routes
  getAllProperties(payload: { estateId?: string; status?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.estateId) {
      params.set("estate_id", payload.estateId);
    }

    // Add the availability parameter conditionally
    if (payload?.status) {
      params.set("status", payload.status);
    }

    // Construct final URL
    const url = `property?${params.toString()}`;

    return this.httpService.get(url);
    // return this.httpService.get("farmers");
  }

  createProperty(data: any) {
    return this.httpService.post("property", data);
  }

  updateProperty(data: any) {
    return this.httpService.put("property", data);
  }
}
