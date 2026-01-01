import { Injectable } from '@angular/core';
import { GlobalConstants } from '../../Common/GlobalConstants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AppsettingService } from '../../Common/appsetting.service';
import { CampusDetailsWebSearchModel } from '../../Models/CampusDetailsWebDataModel';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  //readonly APIUrl = this.appsettingConfig.apiURL + "CampusDetailsWeb";
  readonly headersOptions: any;
  constructor(private http: HttpClient, private appsettingConfig: AppsettingService) {
    this.headersOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authtoken')
      })
    };
  }

  extractData(res: Response) {
    return res;
  }

  handleErrorObservable(error: Response | any) {
    return throwError(error);
  }

  // //Get all data
  // public async GetAllPost(postId: number = 0, DepartmentID: number = 0) {
  //   return await this.http.get(`${this.APIUrl}/GetAllPost/${postId}/${DepartmentID}`, this.headersOptions)
  //     .pipe(
  //       catchError(this.handleErrorObservable)
  //     ).toPromise();
  // }

  // //Get all placement company
  // public async GetAllPlacementCompany(searchRequest: CampusDetailsWebSearchModel) {
  //   var body = JSON.stringify(searchRequest);
  //   return await this.http.post(`${this.APIUrl}/GetAllPlacementCompany`, body, this.headersOptions)
  //     .pipe(
  //       catchError(this.handleErrorObservable)
  //     ).toPromise();
  // }
  // public async GetAllPostExNonList(postId: number = 0, DepartmentID: number = 0) {
  //   return await this.http.get(`${this.APIUrl}/GetAllPostExNonList/${postId}/${DepartmentID}`, this.headersOptions)
  //     .pipe(
  //       catchError(this.handleErrorObservable)
  //     ).toPromise();
  // }

}
