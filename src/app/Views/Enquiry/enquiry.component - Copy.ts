import { Component } from '@angular/core';
import { EnumRole, EnumStatus, GlobalConstants, enumExamStudentStatus } from '../../Common/GlobalConstants';
import { M_StudentMaster_QualificationDetailsModel, StudentMarkedModel, StudentMasterModel, Student_DataModel } from '../../Models/StudentMasterModels';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DropdownValidators } from '../../Services/CustomValidators/custom-validators.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonFunctionService } from '../../Services/CommonFunction/common-function.service';
import { EnquiryService } from '../../Services/Enquiry/Enquiry.service';
import { LoaderService } from '../../Services/Loader/loader.service';
import { ToastrService } from 'ngx-toastr';
//import { UserMasterService } from '../../Services/UserMaster/user-master.service';
import { SweetAlert2 } from '../../Common/SweetAlert2';
import { ActivatedRoute } from '@angular/router';
import { PreExamStudentDataModel, PreExam_UpdateEnrollmentNoModel } from '../../Models/PreExamStudentDataModel';
import { LoginDataModel } from '../../Models/SSOLoginDataModel';
import { SubjectSearchModel } from '../../Models/SubjectMasterDataModel';
import { CommonSubjectDetailsMasterModel } from '../../Models/CommonSubjectDetailsMasterModel';
import { AppsettingService } from '../../Common/appsetting.service';
//import { ReportService } from '../../Services/Report/report.service';
import { ReportBasedModel } from '../../Models/ReportBasedDataModel';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { UploadFileModel } from '../../Models/UploadFileModel';
import { DeleteDocumentDetailsModel } from '../../Models/DeleteDocumentDetailsModel';
import { ViewStudentDetailsRequestModel } from '../../Models/ViewStudentDetailsRequestModel';
import { DocumentDetailsModel } from '../../Models/DocumentDetailsModel';
//import { DocumentDetailsService } from '../../Common/document-details';


@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css'],
  standalone: false
})
export class EnquiryComponent {
  public _GlobalConstants: any = GlobalConstants;
  public State: number = -1;
  public Message: any = [];
  public ErrorMessage: any = [];
  public SubjectID: any[] = [];
  public UserID: number = 0
  public RoleID: number = 0
  public InstituteMasterList: any = [];
  public InstitutionManagementMasterList: any = [];
  public StreamMasterList: any = [];
  public SemesterMasterList: any = [];
  public StudentTypeList: any = [];
  public StudentStatusList: any = [];
  public ExamCategoryList: any = [];
  public PreExamStudentData: StudentMasterModel[] = [];
  public PreExamStudentAnnextureData: StudentMasterModel[] = [];

  public StudentProfileDetailsData: any = [];
  public Student_QualificationDetailsData: any = [];
  public documentDetails: DocumentDetailsModel[] = [];

  public settingsMultiselect: object = {};
  public commonSubjectDetails: CommonSubjectDetailsMasterModel[] = [];
  public Student_DataList: Student_DataModel[] = []
  public NesStudentID: number = 0;
  public InstitutesListForStudent: any = [];

  request = new PreExamStudentDataModel();
  searchrequest = new SubjectSearchModel()
  requestStudent = new StudentMasterModel();
  RequestStudent = new M_StudentMaster_QualificationDetailsModel();
  requestUpdateEnrollmentNo = new PreExam_UpdateEnrollmentNoModel();
  public _EnumRole = EnumRole;
  LoginDataModel = new LoginDataModel();
  public Table_SearchText: string = "";
  modalReference: NgbModalRef | undefined;
  closeResult: string | undefined;
  public IsShowViewStudent: boolean = false;
  public StudentTypeMasterList: any = [];
  public BoardMasterList: any = [];
  public PassingYearList: any = [];
  public ExamStudentStatusDDLList: any = [];
  public CasteCategoryAMasterData: any = [];
  public CasteCategoryBMasterData: any = [];
  public SubjectMasterDDLList: any[] = [];
  public selectedSubjects: any = [];
  public status: number = 0
  public FinancialYear: any = []
  public isShowdrop: boolean = true
  isSearchEnabled: boolean = false;
  IsVerified: boolean = false;
  isDropdownVisible: boolean = false;
  public NewExamStudentStatusDDLList: any = []
  EditStudentDataFormGroup!: FormGroup;
  formUpdateEnrollmentNo!: FormGroup;
  public SearchStudentDataFormGroup!: FormGroup;
  public enquiryForm!: FormGroup;

  public reportRequest = new ReportBasedModel()
  public isLoading: boolean = false;
  public isSubmitted: boolean = false;
  public StudentFilterStatusId: number = 0;
  public GenderList: any = []
  public DateConfigSetting: any = [];
  public MapKeyEng: number = 0;
  public TodayDate = new Date()
  public isShowImageDeleteButton: boolean = false
  public _enumExamStudentStatus = enumExamStudentStatus;

  //table feature default
  public paginatedInTableData: any[] = [];//copy of main data
  public currentInTablePage: number = 1;
  public pageInTableSize: string = "50";
  public totalInTablePage: number = 0;
  public sortInTableColumn: string = '';
  public sortInTableDirection: string = 'asc';
  public startInTableIndex: number = 0;
  public endInTableIndex: number = 0;
  public AllInTableSelect: boolean = false;
  public totalInTableRecord: number = 0;
  //end table feature default

  public SubCasteCategoryADDLList: any[] = [];

  constructor(private commonMasterService: CommonFunctionService,
    private EnquiryService: EnquiryService,
    private loaderService: LoaderService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    //private UserMasterService: UserMasterService,
    private Swal2: SweetAlert2,
    private activatedRoute: ActivatedRoute,
    public appsettingConfig: AppsettingService,
    //private reportService: ReportService,
    private http: HttpClient,
    //private documentDetailsService: DocumentDetailsService
  ) {
  }

  async ngOnInit() {
debugger;
    this.SearchStudentDataFormGroup = this.formBuilder.group(
      {
        ApplicationNo: [''],
        ddlInstituteID: [{ value: '', disabled: false }],
        //ddlFinancialYearID: ['', [DropdownValidators]],
        ddlStreamID: [''],
        ddlSemesterID: [''],
        /* ddlExamstatus: ['', [DropdownValidators]],*/
        ddlStudentTypeID: [''],
        ddlManagementID: [''],
        ddlstatus: [''],
        ddlsubjectstaus: [''],
        ddlbridege: [''],
        ddlExamCategoryID: [''],
        txtStudentName: [''],
        txtMobileNo: ['']
      })

    this.enquiryForm = this.formBuilder.group({
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
  reminderDate: [''],
  assignTo: [''],
  closeReason: ['']
});


    this.EditStudentDataFormGroup = this.formBuilder.group(
      {
        txtStudentName: [{ value: '', disabled: true }, Validators.required],
        txtStudentNameHindi: [{ value: '', disabled: true }, Validators.required],
        txtFatherName: [{ value: '', disabled: true }, Validators.required],
        txtFatherNameHindi: [{ value: '', disabled: true }, Validators.required],
        txtMotherName: [{ value: '', disabled: true }, Validators.required],
        txtMotherNameHindi: [{ value: '', disabled: true }, Validators.required],
        ddlStudentTypeID: [{ value: '', disabled: true }],
        ddlGender: [{ value: '', disabled: true }, Validators.required],
        txtPapers: [{ value: '', disabled: true },],
        ddlInstituteID: [{ value: '', disabled: true }, [DropdownValidators]],
        ddlStreamID: [{ value: '', disabled: true }, [DropdownValidators]],
        txtMobileNo: ['', Validators.required],

        ddlCategoryA_ID: [{ value: '', disabled: true }, [DropdownValidators]],
        ddlCategoryB_ID: [{ value: '', disabled: true }, [DropdownValidators]],
        txtDOB: [{ value: '', disabled: true }, Validators.required],
        txtEmail: [''],
        txtAadharNo: [{ value: '', disabled: true },],
        txtBhamashahNo: [{ value: '', disabled: true },],
        JanAadharNo: [{ value: '', disabled: true },],
        txtAddress: [''],
        txtBankName: [{ value: '', disabled: true },],
        txtIFSCCode: [{ value: '', disabled: true },],
        txtBankAccountNo: [{ value: '', disabled: true },],
        IsVerified: [{ value: '', disabled: false },],
        ddlSubCategoryA_ID: [{ value: '', disabled: true }, Validators.required],
      })
    this.requestStudent.commonSubjectDetails = [];

    this.formUpdateEnrollmentNo = this.formBuilder.group(
      {
        //txtEnrollmentNo: ['', Validators.required, disable: true],
        txtEnrollmentNo: [{ value: '', disabled: true }, Validators.required],
        ddlInstituteID: ['', [DropdownValidators]],
        ddlBranch: ['', [DropdownValidators]],
        txtOrderNo: ['', Validators.required],
        txtOrderDate: ['', Validators.required],
        txtUpdatedDate: ['', Validators.required]
      })
    this.requestStudent.QualificationDetails = [];
    this.LoginDataModel = await JSON.parse(String(localStorage.getItem('LoginUser')));
   
    }
}
