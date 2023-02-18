import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { URLS } from '../constants/URLS';

@Injectable({
  providedIn: 'root'
})
export class EhcService {
  headers_post: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.headers_post == new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
  }

  calculateHappinessLevels(input) {
    const options = { headers: this.headers_post };
    console.log(JSON.stringify(input));
    return this.http.post<any>(URLS.calculateHappinessLevels, input, options)
      .pipe(
        map(responseData => {
          console.log(JSON.stringify(responseData));
          if (responseData.totalScore !=null) {
            return responseData.totalScore;
          } else {
            return undefined;
          }
        }), catchError(errorRes => {
          return throwError(errorRes);
        }))
  }
}
