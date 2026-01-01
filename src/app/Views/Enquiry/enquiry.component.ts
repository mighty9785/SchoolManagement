import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

/* ===== CONSTANTS ===== */
import {
  EnumRole,
  GlobalConstants,
  enumExamStudentStatus
} from '../../Common/GlobalConstants';

import { SweetAlert2 } from '../../Common/SweetAlert2';
import { AppsettingService } from '../../Common/appsetting.service';

/* ===== SERVICES ===== */
import { DropdownValidators } from '../../Services/CustomValidators/custom-validators.service';
import { CommonFunctionService } from '../../Services/CommonFunction/common-function.service';
import { EnquiryService } from '../../Services/Enquiry/Enquiry.service';
import { LoaderService } from '../../Services/Loader/loader.service';

/* ===== MODELS ===== */
import {
  StudentMasterModel,
  Student_DataModel,
  M_StudentMaster_QualificationDetailsModel
} from '../../Models/StudentMasterModels';

import {
  PreExamStudentDataModel,
  PreExam_UpdateEnrollmentNoModel
} from '../../Models/PreExamStudentDataModel';

import { LoginDataModel } from '../../Models/SSOLoginDataModel';
import { SubjectSearchModel } from '../../Models/SubjectMasterDataModel';
import { CommonSubjectDetailsMasterModel } from '../../Models/CommonSubjectDetailsMasterModel';
import { ReportBasedModel } from '../../Models/ReportBasedDataModel';
import { DocumentDetailsModel } from '../../Models/DocumentDetailsModel';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css'],
  standalone: false
})
export class EnquiryComponent implements OnInit {

  /* ================= CONSTANTS ================= */
  GlobalConstants = GlobalConstants;
  EnumRole = EnumRole;
  enumExamStudentStatus = enumExamStudentStatus;

  /* ================= USER / STATE ================= */
  userId = 0;
  roleId = 0;
  state = -1;

  /* ================= MESSAGES ================= */
  messages: string[] = [];
  errorMessages: string[] = [];

  /* ================= MASTER DROPDOWNS ================= */
  categories: any[] = [];
  castes: any[] = [];
  enquiryTypes: any[] = [];

  /* ================= DATA ================= */
  students: StudentMasterModel[] = [];
  studentDataList: Student_DataModel[] = [];
  commonSubjectDetails: CommonSubjectDetailsMasterModel[] = [];
  documentDetails: DocumentDetailsModel[] = [];

  /* ================= REQUEST MODELS ================= */
  enquiryRequest = new PreExamStudentDataModel();
  searchRequest = new SubjectSearchModel();
  studentRequest = new StudentMasterModel();
  qualificationRequest = new M_StudentMaster_QualificationDetailsModel();
  updateEnrollmentRequest = new PreExam_UpdateEnrollmentNoModel();
  loginData = new LoginDataModel();
  reportRequest = new ReportBasedModel();

  /* ================= FORMS ================= */
  searchForm!: FormGroup;
  enquiryForm!: FormGroup;
  editStudentForm!: FormGroup;
  updateEnrollmentForm!: FormGroup;

  /* ================= UI ================= */
  modalRef?: NgbModalRef;
  isLoading = false;
  isSubmitted = false;
  showStudentView = false;

  /* ================= TABLE ================= */
  paginatedData: any[] = [];
  currentPage = 1;
  pageSize = 50;
  totalRecords = 0;

  constructor(
    private fb: FormBuilder,
    private enquiryService: EnquiryService,
    private commonService: CommonFunctionService,
    private loader: LoaderService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private swal: SweetAlert2,
    private route: ActivatedRoute,
    public appSettings: AppsettingService,
    private http: HttpClient
  ) {}

  /* ================= INIT ================= */
  async ngOnInit(): Promise<void> {
    this.buildSearchForm();
    this.buildEnquiryForm();
    this.buildEditStudentForm();
    this.buildUpdateEnrollmentForm();

    this.studentRequest.commonSubjectDetails = [];
    this.studentRequest.QualificationDetails = [];

    const user = localStorage.getItem('LoginUser');
    if (user) {
      this.loginData = JSON.parse(user);
    }
    console.log('Categories:', this.categories);
console.log('Castes:', this.castes);
console.log('Enquiry Types:', this.enquiryTypes);


    await this.loadCommonMasters();
  }

  /* ================= FORM BUILDERS ================= */

  private buildSearchForm(): void {
    this.searchForm = this.fb.group({
      applicationNo: [''],
      instituteId: [''],
      streamId: [''],
      semesterId: [''],
      studentTypeId: [''],
      managementId: [''],
      status: [''],
      subjectStatus: [''],
      bridge: [''],
      examCategoryId: [''],
      studentName: [''],
      mobileNo: ['']
    });
  }

  private buildEnquiryForm(): void {
    this.enquiryForm = this.fb.group({
      enquiryNumber: [''],
      tokenNo: [''],

      firstName: ['', Validators.required],
      middleName: [''],
      lastName: [''],

      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],

      enquiryClass: ['', Validators.required],
      district: [''],
      gender: ['', Validators.required],
      penNo: [''],

      enquiryType: ['', Validators.required],
      category: [''],
      caste: [''],

      referenceRemark: [''],

      tenthBoard: [''],
      tenthPercentage: [''],
      twelfthBoard: [''],
      twelfthPercentage: [''],

      studentAadhaar: [''],
      motherAadhaar: [''],
      fatherAadhaar: [''],

      remark: [''],
      enquiryStatus: ['OPEN'],
      reminderDate: [null],
      assignTo: [''],
      closeReason: ['']
    });
  }

  private buildEditStudentForm(): void {
    this.editStudentForm = this.fb.group({
      studentName: [{ value: '', disabled: true }, Validators.required],
      fatherName: [{ value: '', disabled: true }, Validators.required],
      motherName: [{ value: '', disabled: true }, Validators.required],
      gender: [{ value: '', disabled: true }, Validators.required],
      mobileNo: ['', Validators.required],
      instituteId: [{ value: '', disabled: true }, DropdownValidators],
      streamId: [{ value: '', disabled: true }, DropdownValidators],
      dob: [{ value: '', disabled: true }, Validators.required],
      address: [''],
      isVerified: [false]
    });
  }

  private buildUpdateEnrollmentForm(): void {
    this.updateEnrollmentForm = this.fb.group({
      enrollmentNo: [{ value: '', disabled: true }, Validators.required],
      instituteId: ['', DropdownValidators],
      branchId: ['', DropdownValidators],
      orderNo: ['', Validators.required],
      orderDate: ['', Validators.required],
      updatedDate: ['', Validators.required]
    });
  }

  /* ================= MASTER API ================= */

  private async loadCommonMasters(): Promise<void> {
    const categoryRes = await this.enquiryService.GetCommonMasterData(1);
    if (categoryRes?.Status) {
      this.categories = categoryRes.Result ?? [];
    }

    const casteRes = await this.enquiryService.GetCommonMasterData(2);
    if (casteRes?.Status) {
      this.castes = casteRes.Result ?? [];
    }

    const enquiryTypeRes = await this.enquiryService.GetCommonMasterData(4);
    if (enquiryTypeRes?.Status) {
      this.enquiryTypes = enquiryTypeRes.Result ?? [];
    }
  }

  /* ================= SAVE ENQUIRY ================= */


//   async SaveEnquiry(): Promise<void> {

//   if (this.enquiryForm.invalid) {
//     this.enquiryForm.markAllAsTouched();
//     return;
//   }

//   const payload = this.enquiryForm.value;

//   try {
//     this.isLoading = true;

//     const res = await this.enquiryService.saveEnquiry(payload);

//     if (res?.Status) {
//       this.toastr.success('Enquiry saved successfully');
//       this.enquiryForm.reset({
//         enquiryStatus: 'OPEN'
//       });
//     } else {
//       this.toastr.error(res?.Message || 'Failed to save enquiry');
//     }

//   } catch (error) {
//     console.error(error);
//     this.toastr.error('Something went wrong while saving enquiry');
//   } finally {
//     this.isLoading = false;
//   }
// }

async SaveEnquiry(): Promise<void> {

  if (this.enquiryForm.invalid) {
    this.enquiryForm.markAllAsTouched();
    return;
  }

  const formValue = this.enquiryForm.value;

  const payload = {
  EnquiryId: 0,
  EnquiryNo: '',
  TokenNo: '',

  FirstName: formValue.firstName ?? '',
  MiddleName: formValue.middleName ?? '',
  LastName: formValue.lastName ?? '',
  FatherName: formValue.fatherName ?? '',
  MotherName: formValue.motherName ?? '',

  EnquiryForClassId: formValue.enquiryForClassId ?? 0,
  StateId: formValue.stateId ?? 0,
  DistrictId: formValue.districtId ?? 0,
  Address: formValue.address ?? '',

  GenderId: formValue.genderId ?? 0,
  ReferenceTypeId: formValue.referenceTypeId ?? 0,
  ReferenceRemark: formValue.referenceRemark ?? '',

  EnquiryTypeId: formValue.enquiryTypeId ?? 0,
  CategoryId: formValue.categoryId ?? 0,
  CasteId: formValue.casteId ?? 0,

  Class10BoardName: formValue.class10BoardName ?? '',
  Class10PercentageGrade: formValue.class10PercentageGrade ?? '',
  Class12BoardName: formValue.class12BoardName ?? '',
  Class12PercentageGrade: formValue.class12PercentageGrade ?? '',

  StatusId: 1,
  Remark: formValue.remark ?? '',
  ReminderDate: formValue.reminderDate ?? null,

  MobileNo: formValue.mobileNo ?? '',
  FatherMobileNo: formValue.fatherMobileNo ?? '',
  EmailAddress: formValue.emailAddress ?? '',
  Photo: '',
  AssignedTo: 0
};


  console.log('FINAL API PAYLOAD ', payload);

  try {
    this.isLoading = true;
    const res = await this.enquiryService.saveEnquiry(payload);

    console.log('API RESPONSE ', res);

    if (res?.Status) {
      this.toastr.success('Enquiry saved successfully');
      this.enquiryForm.reset();
    } else {
      this.toastr.error(res?.Message || 'Failed to save enquiry');
    }

  } catch (error) {
    console.error('API ERROR ', error);
    this.toastr.error('Something went wrong while saving enquiry');
  } finally {
    this.isLoading = false;
  }
}


}
