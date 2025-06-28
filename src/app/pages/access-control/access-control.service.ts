import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { EnvService } from "src/app/core/services/env.service";
import { HttpService } from "src/app/core/services/http.service";

@Injectable({ providedIn: "root" })
export class AccessControlService {
  constructor(
    private http: HttpClient,
    private readonly envService: EnvService
  ) {}

  // feature
  getAllFeature(): Observable<any> {
    return this.http.get(`${this.envService.httpService}/feature`);
  }

  getFeatureById(id: any): Observable<any> {
    return this.http.get(`${this.envService.httpService}/feature/${id}`);
  }

  createFeature(data: any) {
    return this.http.post(`${this.envService.httpService}/feature`, data).pipe(
      map((res: any) => {
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

  // privilege
  getAllPrivilege(): Observable<any> {
    return this.http.get(`${this.envService.httpService}/privilege`);
  }

  getPrivilegeById(id: any): Observable<any> {
    return this.http.get(`${this.envService.httpService}/privilege/${id}`);
  }

  createPrivilege(data: any) {
    return this.http
      .post(`${this.envService.httpService}/privilege`, data)
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  updatePrivilege(data: any) {
    return this.http.put(`${this.envService.httpService}/privilege`, data).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  // menu
  getAllMenu(): Observable<any> {
    return this.http.get(`${this.envService.httpService}/menu`);
  }
  getCoreMenuItems(): Observable<any> {
    return this.http.get(`${this.envService.httpService}/menu/get-menu`);
  }

  getMenuById(id: any): Observable<any> {
    return this.http.get(`${this.envService.httpService}/menu/${id}`);
  }

  createMenu(data: any) {
    return this.http.post(`${this.envService.httpService}/menu`, data).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  updateMenu(data: any) {
    return this.http.put(`${this.envService.httpService}/menu`, data).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  // get all privileges
  getAllPrivileges(): Observable<any> {
    return this.http.get(`${this.envService.httpService}/privilege`);
  }

  // menu authorization
  getAllMenuAuthorization(): Observable<any> {
    return this.http.get(`${this.envService.httpService}/menu-authorization`);
  }

  getMenuAuthorizationByPrivilegeId(id: any): Observable<any> {
    return this.http.get(
      `${this.envService.httpService}/menu-authorization/${id}`
    );
  }

  getMenuAuthorizationsByAdmin(adminId: number): Observable<any> {
    return this.http.get(
      `${this.envService.httpService}/menu-authorization/get-user-menu/${adminId}`
    );
  }

  createMenuAuthorization(data: any) {
    return this.http
      .post(`${this.envService.httpService}/menu-authorization`, data)
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  assignMenuAccess(data: any) {
    return this.http
      .post(
        `${this.envService.httpService}/menu-authorization/assign-menu-access`,
        data
      )
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  updateMenuAuthorizationByPrivilegeId(data: any) {
    return this.http
      .put(`${this.envService.httpService}/menu-authorization`, data)
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }
}
