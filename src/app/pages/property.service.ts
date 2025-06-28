import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpService } from "src/app/core/services/http.service";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { EnvService } from "../core/services/env.service";

@Injectable({ providedIn: "root" })
export class PropertyService {
  constructor(
    private http: HttpClient,
    private readonly httpService: HttpService,
    private envService: EnvService
  ) {}

  // meal sub-types observable
  private propertySubTypesSubject = new BehaviorSubject<any | []>([]);
  get propertySubTypes$() {
    return this.propertySubTypesSubject.asObservable();
  }
  setPropertySubTypes(propertySubTypes: any) {
    this.propertySubTypesSubject.next(propertySubTypes);
  }

  uploadFile(data: any) {
    return (
      this.http
        // .post(`${this.envService.userService}/file/upload`, data)
        .post(`${this.envService.httpService}/upload`, data)
        .pipe(
          map((res: any) => {
            return res.secure_url;
          })
        )
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
}
