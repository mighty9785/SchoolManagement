import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { EnumRole, GlobalConstants, enumExamStudentStatus } from '../../Common/GlobalConstants';
import { SweetAlert2 } from '../../Common/SweetAlert2';
import { AppsettingService } from '../../Common/appsetting.service';
import { DropdownValidators } from '../../Services/CustomValidators/custom-validators.service';
import { CommonFunctionService } from '../../Services/CommonFunction/common-function.service';
import { EnquiryService } from '../../Services/Enquiry/Enquiry.service';
import { LoaderService } from '../../Services/Loader/loader.service';
import { StudentMasterModel, Student_DataModel, M_StudentMaster_QualificationDetailsModel} from '../../Models/StudentMasterModels';
import { PreExamStudentDataModel, PreExam_UpdateEnrollmentNoModel} from '../../Models/PreExamStudentDataModel';
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
  previewUrl: string | null = null;
  uploadedFileName = '';

  messages: string[] = [];
  errorMessages: string[] = [];

  /* ================= MASTER DROPDOWNS ================= */
  categories: any[] = [];
  castes: any[] = [];
  enquiryTypes: any[] = [];
  classType: any[] = [];
  enquiryStatus: any[] = [];
  enquiryRefrenceType: any[] = [];
    
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
    debugger;
    this.buildEnquiryForm();

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

  private buildEnquiryForm(): void {
    this.enquiryForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: [''],
       profile: [''],

      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
       email: [''],
      fatherMobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      enquiryClass: ['', Validators.required],
      stateId: [''],
      districtId: [''],
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
      EnquiryTypeId: ['', Validators.required],
      enquiryStatus: ['',  Validators.required],
      reminderDate: [null],
      assignTo: [''],
      closeReason: ['']
    });
  }

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

    const enquiryStatusRes = await this.enquiryService.GetCommonMasterData(5);
    if (enquiryStatusRes?.Status) {
      this.enquiryStatus = enquiryStatusRes.Result ?? [];
    }

    const enquiryRefrenceRes = await this.enquiryService.GetCommonMasterData(6);
    if (enquiryRefrenceRes?.Status) {
      this.enquiryRefrenceType = enquiryRefrenceRes.Result ?? [];
    }

    const classTypeRes = await this.enquiryService.GetClassData(0);
    if (classTypeRes?.Status) {
      this.classType = classTypeRes.Result ?? [];
    }
  }

  async onFileChange(event: Event): Promise<void> {
    debugger;
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    // Set file in existing form control
    //this.enquiryForm.get('profile')?.setValue(file);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await this.enquiryService.upload(formData);

      // Use API response
      this.previewUrl = result.imageUrl;
      this.uploadedFileName = result.fileName || file.name;

    } catch (err) {
      console.error('File upload failed', err);
    }
  }

async SaveEnquiry(): Promise<void> {

  if (this.enquiryForm.invalid) {
    this.enquiryForm.markAllAsTouched();
    return;
  }

  const formValue = this.enquiryForm.value;

  try {
    this.isLoading = true;
    const res = await this.enquiryService.saveEnquiry(formValue);

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
