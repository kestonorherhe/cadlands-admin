import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpService } from "src/app/core/services/http.service";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class SettingsService {
  constructor(
    private http: HttpClient,
    private readonly httpService: HttpService
  ) {}

  // meal sub-types observable
  private propertySubTypesSubject = new BehaviorSubject<any | []>([]);
  get propertySubTypes$() {
    return this.propertySubTypesSubject.asObservable();
  }
  setPropertySubTypes(propertySubTypes: any) {
    this.propertySubTypesSubject.next(propertySubTypes);
  }

  //   gender
  createGender(data: any) {
    return this.httpService.post(`gender`, data);
  }
  updateGender(data: any) {
    return this.httpService.post(`gender/create-agent`, data);
  }

  getAllGender(payload: { staffId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.staffId) {
      params.set("staff_id", payload.staffId);
    }

    // Construct final URL
    const url = `gender?${params.toString()}`;

    return this.httpService.get(url);
  }

  //   nationality
  createNationality(data: any) {
    return this.httpService.post(`nationality`, data);
  }
  updateNationality(data: any) {
    return this.httpService.post(`nationality`, data);
  }

  getAllNationality(payload: { staffId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.staffId) {
      params.set("staff_id", payload.staffId);
    }

    // Construct final URL
    const url = `nationality?${params.toString()}`;

    return this.httpService.get(url);
  }

  //   nationality
  createPropertyType(data: any) {
    return this.httpService.post(`property-type`, data);
  }
  createPropertySubType(data: any) {
    return this.httpService.post(`property-type/property-sub-type`, data);
  }
  updatePropertyType(data: any) {
    return this.httpService.post(`property-type`, data);
  }

  getAllPropertyTypes(payload: { propertyTypeId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.propertyTypeId) {
      params.set("property_type_id", payload.propertyTypeId);
    }

    // Construct final URL
    const url = `property-type?${params.toString()}`;

    return this.httpService.get(url);
  }

  //   nationality
  createNegotiationStatus(data: any) {
    return this.httpService.post(`negotiation-status`, data);
  }

  updateNegotiationStatus(data: any) {
    return this.httpService.post(`negotiation-status`, data);
  }

  getAllNegotiationStatus(payload: { propertyTypeId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.propertyTypeId) {
      params.set("property_type_id", payload.propertyTypeId);
    }

    // Construct final URL
    const url = `negotiation-status?${params.toString()}`;

    return this.httpService.get(url);
  }

  //   payment plan
  createPaymentPlan(data: any) {
    return this.httpService.post(`payment-plan`, data);
  }

  updatePaymentPlan(data: any) {
    return this.httpService.post(`payment-plan`, data);
  }

  getAllPaymentPlans(payload: { propertyTypeId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.propertyTypeId) {
      params.set("property_type_id", payload.propertyTypeId);
    }

    // Construct final URL
    const url = `payment-plan?${params.toString()}`;

    return this.httpService.get(url);
  }

  //   precautionary tip routes
  createPrecautionaryTip(data: any) {
    return this.httpService.post(`precautionary-tip`, data);
  }

  updatePrecautionaryTip(data: any) {
    return this.httpService.post(`precautionary-tip`, data);
  }

  getAllPrecautionaryTips(payload: { propertyTypeId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.propertyTypeId) {
      params.set("property_type_id", payload.propertyTypeId);
    }

    // Construct final URL
    const url = `precautionary-tip?${params.toString()}`;

    return this.httpService.get(url);
  }

  //   precautionary tip routes
  createPropertyFacility(data: any) {
    return this.httpService.post(`property-facility`, data);
  }

  updatePropertyFacility(data: any) {
    return this.httpService.post(`property-facility`, data);
  }

  getAllPropertyFacilities(payload: { propertyTypeId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.propertyTypeId) {
      params.set("property_type_id", payload.propertyTypeId);
    }

    // Construct final URL
    const url = `property-facility?${params.toString()}`;

    return this.httpService.get(url);
  }

  //   precautionary tip routes
  createPropertyPurpose(data: any) {
    return this.httpService.post(`property-purpose`, data);
  }

  updatePropertyPurpose(data: any) {
    return this.httpService.post(`property-purpose`, data);
  }

  getAllPropertyPurpose(payload: { propertyTypeId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.propertyTypeId) {
      params.set("property_type_id", payload.propertyTypeId);
    }

    // Construct final URL
    const url = `property-purpose?${params.toString()}`;

    return this.httpService.get(url);
  }
}
