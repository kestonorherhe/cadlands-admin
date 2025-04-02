import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { EnvService } from 'src/app/core/services/env.service';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {
  url = 'assets/data/data.json';
  constructor(private http: HttpClient, private envService: EnvService) {}

  private handleError(error: HttpErrorResponse) {
    console.log("🚀 ~ AuthenticationService ~ handleError ~ error:", error)
    let errorMessage = "An error occurred";
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      // errorMessage = `Client-side error: ${error.error.message}`;
      errorMessage = `Client-side error: ${error}`;
    } else {
      // Server-side error
      // errorMessage = `Server-side error: ${error.status} - ${error.error.message}`;
      errorMessage = `${error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

   // GET method to fetch data from the API
   public get<T>(endpoint: string): Observable<T> {
    return this.http
      .get<T>(`${this.envService.httpService}/${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  // POST method to send data to the API
  public post<T>(endpoint: string, data: any): Observable<T> {
    return this.http
      .post<T>(`${this.envService.httpService}/${endpoint}`, data)
      .pipe(catchError(this.handleError));
  }

  // POST method to send data to the API
  public put<T>(endpoint: string, data: any): Observable<T> {
    return this.http
      .put<T>(`${this.envService.httpService}/${endpoint}`, data)
      .pipe(catchError(this.handleError));
  }
}
