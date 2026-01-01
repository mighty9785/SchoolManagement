import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { AppsettingService } from '../../Common/appsetting.service';

/* ===== MODELS ===== */
import {
  PreExamStudentDataModel,
  PreExam_UpdateEnrollmentNoModel
} from '../../Models/PreExamStudentDataModel';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  private readonly enquiryApiUrl: string;
  private readonly masterApiUrl: string;
  private readonly EnquirySaveApiUrl: string;


  constructor(
    private http: HttpClient,
    private appsettingConfig: AppsettingService
  ) {
    this.enquiryApiUrl = `${this.appsettingConfig.apiURL}Enquiry`;
    this.masterApiUrl = `${this.appsettingConfig.apiURL}Master`;
    this.EnquirySaveApiUrl = `${this.appsettingConfig.apiURL}Enquiry`;

  }

  /* ================= HEADERS ================= */

  private get headersOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authtoken') || ''}`
      })
    };
  }

  /* ================= COMMON ERROR HANDLER ================= */

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => error);
  }

  /* ================= ENQUIRY APIS ================= */

  async getPreExamStudent(
    request: PreExamStudentDataModel
  ): Promise<any> {
    return firstValueFrom(
      this.http
        .post<any>(
          `${this.enquiryApiUrl}/GetPreExamStudent`,
          request,
          this.headersOptions
        )
        .pipe(catchError(this.handleError))
    );
  }

  /* ================= COMMON MASTER API ================= */

  async GetCommonMasterData(
    commonMasterId: number
  ): Promise<any> {
    return firstValueFrom(
      this.http
        .get<any>(
          `${this.masterApiUrl}/GetCommonMasterData?CommonMasterId=${commonMasterId}`,
          this.headersOptions
        )
        .pipe(catchError(this.handleError))
    );
  }

  /* ================= UPDATE ENROLLMENT (IF NEEDED) ================= */

  async updateEnrollmentNo(
    request: PreExam_UpdateEnrollmentNoModel
  ): Promise<any> {
    return firstValueFrom(
      this.http
        .post<any>(
          `${this.enquiryApiUrl}/UpdateEnrollmentNo`,
          request,
          this.headersOptions
        )
        .pipe(catchError(this.handleError))
    );
  }

  /* ================= SAVE ENQUIRY ================= */

// async saveEnquiry(
//   request: any   // you can replace `any` with a proper model later
// ): Promise<any> {
//   return firstValueFrom(
//     this.http
//       .post<any>(
//         `${this.enquiryApiUrl}/create-new`,
//         request,
//         this.headersOptions
//       )
//       .pipe(catchError(this.handleError))
//   );
// }

async saveEnquiry(request: any): Promise<any> {

  const authHeader =
    this.headersOptions?.headers?.get('Authorization');

  console.log('Bearer Token:', authHeader);

  console.log('Request Payload:', request);

  return firstValueFrom(
    this.http
      .post<any>(
        `${this.enquiryApiUrl}/create-new`,
        request,
        this.headersOptions
      )
      .pipe(catchError(this.handleError))
  );
}


}
