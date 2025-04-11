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

  // register payment sub-plan observable
  private paymentSubPlanCommissionsSubject = new BehaviorSubject<any | []>([]);
  get paymentSubPlanCommissions$() {
    return this.paymentSubPlanCommissionsSubject.asObservable();
  }

  setPaymentSubPlanCommissions(paymentSubPlanCommissions: any) {
    this.paymentSubPlanCommissionsSubject.next(paymentSubPlanCommissions);
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

  // property location commissions observables
  private propertyLocationCommissionsSubject = new BehaviorSubject<any | []>(
    []
  );
  get propertyLocationCommissions$() {
    return this.propertyLocationCommissionsSubject.asObservable();
  }
  setPropertyLocationCommissions(propertyLocationCommissions: any) {
    this.propertyLocationCommissionsSubject.next(propertyLocationCommissions);
  }

  // property purpose commissions observables
  private propertyPurposeCommissionsSubject = new BehaviorSubject<any | []>([]);
  get propertyPurposeCommissions$() {
    return this.propertyPurposeCommissionsSubject.asObservable();
  }
  setPropertyPurposeCommissions(propertyPurposeCommissions: any) {
    this.propertyPurposeCommissionsSubject.next(propertyPurposeCommissions);
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
  updatePropertyType(data: any) {
    return this.httpService.put(`property-type`, data);
  }
  createPropertySubType(data: any) {
    return this.httpService.post(`property-type/property-sub-type`, data);
  }
  updatePropertySubType(data: any) {
    return this.httpService.put(`property-type/property-sub-type`, data);
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
    return this.httpService.post(`affiliate-package/package-price`, data);
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
    return this.httpService.put(`negotiation-status`, data);
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
    return this.httpService.put(`payment-plan/payment-sub-plan`, data);
  }

  createPaymentSubPlanCommission(data: any) {
    return this.httpService.post(`payment-plan/payment-commission`, data);
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

  getAllPaymentSubPlans(payload: { paymentSubPlanId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.paymentSubPlanId) {
      params.set("payment_sub_plan_id", payload.paymentSubPlanId);
    }

    // Construct final URL
    const url = `payment-plan/payment-sub-plan?${params.toString()}`;

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

  //   faq routes
  createFaq(data: any) {
    return this.httpService.post(`faq`, data);
  }

  updateFaq(data: any) {
    return this.httpService.put(`faq`, data);
  }

  getAllFaqs(payload: { estateId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.estateId) {
      params.set("estate_id", payload.estateId);
    }

    // Construct final URL
    const url = `faq?${params.toString()}`;

    return this.httpService.get(url);
  }

  //   precautionary tip routes
  createPropertyFacility(data: any) {
    return this.httpService.post(`property-facility`, data);
  }

  updatePropertyFacility(data: any) {
    return this.httpService.put(`property-facility`, data);
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

  createPropertyPurposeCommission(data: any) {
    return this.httpService.post(
      `property-purpose/update-property-purpose-commission`,
      data
    );
  }

  updatePropertyPurpose(data: any) {
    return this.httpService.post(`property-purpose`, data);
  }

  getAllPropertyPurpose(payload: { propertyPurposeId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.propertyPurposeId) {
      params.set("property_purpose_id", payload.propertyPurposeId);
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

  // property location routes
  createPropertyLocation(data: any) {
    return this.httpService.post(`property-location`, data);
  }
  createPropertyLocationCommission(data: any) {
    return this.httpService.post(
      `property-location/update-property-location-commission`,
      data
    );
  }
  updatePropertyLocation(data: any) {
    return this.httpService.put(`property-location`, data);
  }

  getAllPropertyLocations(payload: { propertyLocationId?: string }) {
    // Initialize URLSearchParams
    const params = new URLSearchParams();

    // Add the availability parameter conditionally
    if (payload?.propertyLocationId) {
      params.set("property_location_id", payload.propertyLocationId);
    }

    // Construct final URL
    const url = `property-location?${params.toString()}`;

    return this.httpService.get(url);
  }
}
