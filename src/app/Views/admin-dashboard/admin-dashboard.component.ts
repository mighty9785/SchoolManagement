import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EnumRole, EnumEMProfileStatus } from '../../Common/GlobalConstants';
import { StudentExamDetails } from '../../Models/DashboardCardModel';
import { ITIAdminDashboardSearchModel } from '../../Models/ITIAdminDashboardDataModel';
import { LoginDataModel } from '../../Models/SSOLoginDataModel';
import { LoaderService } from '../../Services/Loader/loader.service';
import { AdminDashboardServiceService } from '../../Services/Admin-Dashboard-Service/admin-dashboard-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  standalone: false
})
export class AdminDashboardComponent {
  public LoginDataModel = new LoginDataModel();
  public _EnumRole = EnumRole;
  public State: number = 0;
  public SuccessMessage: string = '';
  public ErrorMessage: string = '';
  public viewAdminDashboardList: StudentExamDetails[] = [];
  public ITIsWithNumberOfFormsList: any = [];
  public ITIsWithNumberOfFormsPriorityList: any = [];
  public invigilatorRemuneretionlist: any = [];
  public Table_SearchText: string = "";
  public searchRequest = new ITIAdminDashboardSearchModel();

  public viewAdminDashboardListEnrollment: StudentExamDetails[] = [];
  public viewAdminDashboardListExamination: StudentExamDetails[] = [];
  public viewAdminDashboardListOther: StudentExamDetails[] = [];
  public viewApplicationCount: StudentExamDetails[] = [];
  public DistrictMasterList: any = [];
  public DashBoardDispatchList: any[] = [];
  public DashboardITI_InvigilatorRemunerationList: any[] = [];
  public _EnumEMProfileStatus = EnumEMProfileStatus;
  constructor(private AdminDashboardServiceService: AdminDashboardServiceService,
    private toastr: ToastrService, private loaderService: LoaderService, private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, private routers: Router, private modalService: NgbModal) {
    this.LoginDataModel = JSON.parse(String(localStorage.getItem('LoginUser')));
  }

  //Data Load
  ngOnInit() {
    debugger;
    // if (this.LoginDataModel.EmTypeId == 1) {
    //   if (this.sSOLoginDataModel.ProfileID == this._EnumEMProfileStatus.Pending || this.sSOLoginDataModel.ProfileID == this._EnumEMProfileStatus.Revert || this.sSOLoginDataModel.ProfileID == this._EnumEMProfileStatus.Completed) {
    //     window.open("/ITIGOVTEMPersonalDetailsApplicationTab", "_Self")
    //   }
    // }
    this.GetAllData();
  }


  async GetAllData() {
    try
    {
      //this.DashBoardDispatchList = this.LoginDataModel.Menus

      // if (this.searchRequest && this.searchRequest.RoleID > 0)
      // {
      //   await this.AdminDashboardServiceService.GetAdminDashSCVTData(this.searchRequest)
      //     .then((data: any) => {
      //       data = JSON.parse(JSON.stringify(data));
      //       this.viewAdminDashboardList = data['Data'];
      //       // Filter based on ListType 'EnrollmentType'
      //       this.viewAdminDashboardListEnrollment = this.viewAdminDashboardList.filter(s => s.ListType === 'EnrollmentType');
      //       // Filter based on ListType 'ExaminationType'
      //       this.viewAdminDashboardListExamination = this.viewAdminDashboardList.filter(s => s.ListType === 'ExaminationType');
      //       this.DashBoardITIDispatchList = this.viewAdminDashboardList.filter(s => s.ListType == 'ITIDispatch');
      //       this.invigilatorRemuneretionlist = this.viewAdminDashboardList.filter(s => s.ListType == 'InvigilatorRemuneretion');

      //       //console.log(this.viewAdminDashboardListEnrollment, "EnrollmentType");
      //     }, (error: any) => console.error(error)
      //     );
      // }


    }
    catch (ex) {
      console.log(ex);
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
    }
  }
}
