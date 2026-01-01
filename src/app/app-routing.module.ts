


import { Title } from '@angular/platform-browser';
import { RouterModule, Routes, TitleStrategy, RouterStateSnapshot } from '@angular/router';
import { MasterLayoutComponent } from './Views/Shared/master-layout/master-layout.component';
import { HomeLayoutComponent } from './Views/Shared/home-layout/home-layout.component';
import { AuthLayoutComponent } from './Views/Shared/auth-layout/auth-layout.component';
import { Injectable, NgModule } from '@angular/core';
import { AuthGuard } from './Common/auth.guard.ts';
const routes: Routes = [
  //{ path: '**', component: PageNotFoundComponent },// create not found component
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },

  {
    //root
    path: '', component: AuthLayoutComponent,
    children: [

      { path: 'login', loadChildren: () => import('./Views/login/login.module').then(m => m.LoginModule), title: 'Login' },

      // { path: 'bter-college-code-mapping', loadChildren: () => import('./Views/BTER/bter-college-code-mapping/bter-college-code-mapping.module').then(m => m.BterCollegeCodeMappingModule), title: 'bter colloge sso mapping' },

      // { path: 'ITICollegeSSOMapping', loadChildren: () => import('./Views/iticollege-ssomapping/iticollege-ssomapping.module').then(m => m.ITICollegeSSOMappingModule), title: 'iti colloge sso mapping' },


      // { path: 'student-login', loadChildren: () => import('./Views/student-login/student-login.module').then(m => m.StudentLoginModule), title: 'Student Login' },
      // {
      //   path: 'ssologin', loadChildren: () => import('./Views/ssologin/ssologin.module').then(m => m.SSOLoginModule), title: 'SSO Login'
      // },
      // {
      //   path: 'ssologin/:id1', loadChildren: () => import('./Views/ssologin/ssologin.module').then(m => m.SSOLoginModule), title: 'SSO Login'
      // },
   
    ]
  },
  {
    //admin
    path: '', component: MasterLayoutComponent, canActivate: [AuthGuard],
    children: [
      // {
      //   path: 'profile', loadChildren: () => import('./Views/profile/profile.module').then(m => m.ProfileModule), title: 'Profile'
      // },
      {
        path: 'dashboard', loadChildren: () => import('./Views/dashboard/dashboard.module').then(m => m.dashboardModule), title: 'Dashboard'
      },
      // {
      //   path: 'rolemaster', loadChildren: () => import('./Views/role-master/role-master.routing.module').then(m => m.RoleMasterRoutingModule), title: 'Role Master'
      // },
      {
        path: 'loader', loadChildren: () => import('./Views/Shared/loader/loader.module').then(m => m.LoaderModule),
      },
      // { path: 'menumaster', loadChildren: () => import('./Views/menu-master/menu-master.module').then(m => m.MenuMasterModule), title: 'Menu Master' },
      {
        path: 'enquiry', loadChildren: () => import('./Views/Enquiry/enquiry.module').then(m => m.EnquiryModule), title: 'Enquiry'
      },
    ]
  },
];

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`${title} - Test Application`);
    }
  }
}
@NgModule({
  imports: [
    //RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: false,  paramsInheritanceStrategy: 'always' })

    RouterModule.forRoot(routes, {
      useHash: false, onSameUrlNavigation: 'reload', paramsInheritanceStrategy: 'always'
    })
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy
    }
  ]
})
export class AppRoutingModule { }




