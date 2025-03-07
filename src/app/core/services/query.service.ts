import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../models/auth.models";
import { HttpService } from "./http.service";

@Injectable({ providedIn: "root" })
export class QueryService {
  constructor(
    private http: HttpClient,
    private readonly httpService: HttpService
  ) {}

  getAll() {
    return this.http.get<User[]>(`/api/login`);
  }

  register(user: User) {
    return this.http.post(`/users/register`, user);
  }

  getAllAppointments() {
    return this.httpService.get("appointments");
  }

  bookAppointment(data) {
    return this.httpService.post("appointments/create-appointment", data);
  }

  searchDocument(params) {
    return this.httpService.get(`documents/search?name=${params.documentName}`);
  }

  //   users
  getAllUsers() {
    return this.httpService.get("users/");
  }

  //   admin
  getAllAdmins() {
    return this.httpService.get("admins/");
  }

  //   category
  getAllCategories() {
    return this.httpService.get("category/");
  }

  //   sserice
  getAllServices() {
    return this.httpService.get("services/");
  }

  //   location
  getAllLocations() {
    return this.httpService.get("locations/");
  }

  //   document
  getAllDocuments() {
    return this.httpService.get("documents/");
  }
  captureDocument(formData: FormData) {
    return this.httpService.post("documents/", formData);
  }

  getDocumentBase64(filePath: string) {
    return this.httpService.get(`documents/get-file?filePath=${filePath}`);
  }

  //   document
  getAllProfessions() {
    return this.httpService.get("professions/");
  }

  // planning information
  getAllApplications(status: string) {
    return this.httpService.get(`planning-information?status=${status}`);
  }

  assignChartingOfficer(updateApplication: any) {
    return this.httpService.put(
      `planning-information/assign-charting-officer`,
      updateApplication
    );
  }

  processApplication(updateApplication: any) {
    return this.httpService.put(
      `planning-information/process-application`,
      updateApplication
    );
  }

  processInspection(updateApplication: any) {
    return this.httpService.put(
      `planning-information/process-inspection`,
      updateApplication
    );
  }

  completeApplication(updateApplication: any) {
    return this.httpService.put(
      `planning-information/complete-application`,
      updateApplication
    );
  }
}
