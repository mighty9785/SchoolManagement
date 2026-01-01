import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./Views/Shared/auth-layout/auth-layout.component";
import { HomeLayoutComponent } from "./Views/Shared/home-layout/home-layout.component";
import { MasterLayoutComponent } from "./Views/Shared/master-layout/master-layout.component";

export const routes: Routes = [
    //{ path: '**', component: PageNotFoundComponent },// create not found component
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        //front web - home
        path: '', component: HomeLayoutComponent,
        children: [
            {
                path: '', loadChildren: () => import('./Views/Home/home/home.module').then(m => m.HomeModule), title: 'Home'
            },
           
        ]
    },
    {
        //admin
        path: '', component: MasterLayoutComponent,
        children:[
            // {
            //     path: 'profile', loadChildren: () => import('./Views/profile/profile.module').then(m => m.ProfileModule), title: 'Profile'
            // },
             {
               path: 'Enquiry', loadChildren: () => import('./Views/Enquiry/enquiry.module').then(m => m.EnquiryModule), title: 'Enquiry'
             },
        ]
    },
    {
        //root
        path: '', component: AuthLayoutComponent,
        children: [
            { path: 'login', loadChildren: () => import('./Views/login/login.module').then(m => m.LoginModule), title: 'Login' },
            
        ]
    },

    { path: '**', loadComponent: () => import('./Views/errors/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent), title: '404 - Page not found' },
];
