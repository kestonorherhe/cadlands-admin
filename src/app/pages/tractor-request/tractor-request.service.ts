import { Injectable } from "@angular/core";
import { HttpService } from "src/app/core/services/http.service";

@Injectable({ providedIn: "root" })
export class TractorRequestService {
  constructor(
    private readonly httpService: HttpService
  ) {}

  getAllRequest() {
    return this.httpService.get("tractor-request");
  }

  requestTractor(data) {
    return this.httpService.post("tractor-request", data);
  }
}
