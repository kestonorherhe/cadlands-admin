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

  // payment sub plans observable
  private paymentSubPlansSubject = new BehaviorSubject<any | []>([]);
  get paymentSubPlans$() {
    return this.paymentSubPlansSubject.asObservable();
  }
  setPaymentSubPlans(paymentSubPlans: any) {
    this.paymentSubPlansSubject.next(paymentSubPlans);
  }

  // meal sub-types observable
  private propertySubTypesSubject = new BehaviorSubject<any | []>([]);
  get propertySubTypes$() {
    return this.propertySubTypesSubject.asObservable();
  }
  setPropertySubTypes(propertySubTypes: any) {
    this.propertySubTypesSubject.next(propertySubTypes);
  }

  // pakage prices observable
  private pricesSubject = new BehaviorSubject<any | []>([]);
  get prices$() {
    return this.pricesSubject.asObservable();
  }
  setPackagePrices(prices: any) {
    this.pricesSubject.next(prices);
  }

  // direct sale commission observable
  private directSaleCommissionsSubject = new BehaviorSubject<any | []>([]);
  get directSaleCommissions$() {
    return this.directSaleCommissionsSubject.asObservable();
  }
  setDirectSaleCommissions(directSaleCommissions: any) {
    this.directSaleCommissionsSubject.next(directSaleCommissions);
  }

  // indirect sale commission observable
  private indirectSaleCommissionsSubject = new BehaviorSubject<any | []>([]);
  get indirectSaleCommissions$() {
    return this.indirectSaleCommissionsSubject.asObservable();
  }
  setIndirectSaleCommissions(indirectSaleCommissions: any) {
    this.indirectSaleCommissionsSubject.next(indirectSaleCommissions);
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
  // affiliate package routes
  createAffiliatePackage(data: any) {
    return this.httpService.post(`affiliate-package`, data);
  }

  createPackagePrice(data: any) {
    return this.httpService.post(
      `affiliate-package/package-price`,
      data
    );
  }

  createDirectSaleCommission(data: any) {
    return this.httpService.post(
      `affiliate-package/direct-sale-commission`,
      data
    );
  }

  createIndirectSaleCommission(data: any) {
    return this.httpService.post(
      `affiliate-package/indirect-sale-commission`,
      data
    );
  }

  updateAffiliatePackage(data: any) {
    return this.httpService.put(`affiliate-package`, data);
  }

  getAllAffiliatePackages(payload: { affiliatePackageId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.affiliatePackageId) {
      params.set("affiliate_package_id", payload.affiliatePackageId);
    }

    // Construct final URL
    const url = `affiliate-package?${params.toString()}`;

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
  // payment sub plan
  createPaymentSubPlan(data: any) {
    return this.httpService.post(`payment-plan/payment-sub-plan`, data);
  }

  updatePaymentSubPlan(data: any) {
    return this.httpService.post(`payment-plan/payment-sub-plan`, data);
  }

  getAllPaymentPlans(payload: { paymentPlanId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.paymentPlanId) {
      params.set("payment_plan_id", payload.paymentPlanId);
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

  //   precautionary tip routes
  createRelationship(data: any) {
    return this.httpService.post(`relationship`, data);
  }

  updateRelationship(data: any) {
    return this.httpService.post(`relationship`, data);
  }

  getAllRelationship(payload: { propertyTypeId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.propertyTypeId) {
      params.set("property_type_id", payload.propertyTypeId);
    }

    // Construct final URL
    const url = `relationship?${params.toString()}`;

    return this.httpService.get(url);
  }
}
