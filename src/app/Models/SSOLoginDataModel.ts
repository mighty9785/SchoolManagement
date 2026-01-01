import { IMenu } from "../Services/Loader/loader.interceptor";

export class LoginDataModel {
  public UserDetails!: UserDetails;
  public Roles!: UserRole[];
  public ExpiresIn!: number;
  public Menus!: Menu[];
}

export class UserDetails {
  public UserId!: number;
  public Name!: string;
  public Phone!: string;
  public UserName!: string;
  public Email!: string;
  public RoleId!: number;
  public RoleName!: string;
}

export class UserRole {
  public UserRoleDeptMappingId!: number;
  public UserId!: number;
  public RoleId!: number;
  public RoleName!: string;
  public DepartmentId!: number;
  public DeptName!: string;
  public IsCurrentRole!: boolean;
}

export class Menu {
  public MenuId!: number;
  public MenuName!: string;
  public Icon!: string;
  public MenuUrl?: string;
  public Children?: Menu[];
}




export class SSOLoginDataModel {

  public ProfileID: number = 0
  public UserID: number = 0
  public LevelId: number = 0
  public ApplicationID: number = 0
  public ApplicationFinalSubmit: number = 0
  public SSOID: string = '';
  public Aadhaarid: string = '';
  public Bhamashahid: string = '';
  public Bhamashahmemberid: string = '';
  public DisplayName: string = '';
  public Dateofbirth: string = '';
  public Gender: string = '';
  public Mobileno: string = '';
  public Telephonenumber: string = '';
  public Ipphone: string = '';
  public Mailpersonal: string = '';
  public Postaladdress: string = '';
  public Postalcode: string = '';
  public City: string = '';
  public State: string = '';
  public Photo: string = '';
  public Designation: string = '';
  public DepartmentName: string = '';
  public Mailofficial: string = '';
  public EmployeeNumber: string = '';
  public DepartmentID: number = 0;
  public FirstName: string = '';
  public LastName: string = '';
  public SldSSOIDs: any = '';
  public JanaadhaarId: string = '';
  public ManaadhaarMemberId: string = '';
  public UserType: string = '';
  public Mfa: string = '';
  public RoleID: number = 0;
  public InstituteID: number = 0;
  public RoleName: string = '';
  public StudentID: number = 0;
  public InstituteName: string = '';
  public Eng_NonEng: number = 0;
  public Eng_NonEngName: string = '';
  public FinancialYearID: number = 0;
  public EndTermID: number = 0;
  public TermPart: number = 0;
  public FinancialYearID_Session: number = 0;
  public EndTermID_Session: number = 0;
  public HostelID: number = 0;
  public IsMutiHostelWarden: boolean = false;
  public IsCitizenQueryUser: boolean = false;
  public QueryType: number = 0;
  public HostelIDs: string = '';
    public SubjectCode: string = '';
    public GuestRoomID: number = 0;
  public StaffID: number = 0;
  public ExamScheme: number = 0;
  public ServiceID: string = '';
  public IsKiosk: boolean = false;
  public KIOSKCODE: string = '';
  public SSoToken: string = '';
  public EmTypeId: number = 0;
  public SSOMenu: IMenu[] = [];
   //public MobileNo: number = 0;
}


export class SSOLandingDataDataModel {
  public Username: string = '';
  public LoginType: string = '';
  public Password: string = '';
 
}
export class UpdateStudentDetailsModel {
  public UserID: number = 0;
  public ProfileID: number = 0;
  public SSOID: string = '';
  public RoleID: number = 0;
}


