import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoaderInterceptor } from './Services/Loader/loader.interceptor';
import { LoaderModule } from './Views/Shared/loader/loader.module';
import { MasterLayoutComponent } from './Views/Shared/master-layout/master-layout.component';
import { HomeLayoutComponent } from './Views/Shared/home-layout/home-layout.component';
import { AppsettingService } from './Common/appsetting.service';
import { AuthLayoutComponent } from './Views/Shared/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './Views/Shared/main-layout/main-layout.component';
import { SSOLoginService } from './Services/SSOLogin/ssologin.service';
import { AuthGuard } from './Common/auth.guard.ts';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ScrollingModule } from '@angular/cdk/scrolling';
// import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MaterialModule } from './material.module';
import { ToastrModule } from 'ngx-toastr';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIdleModule } from '@ng-idle/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// load this before app initiliaze
export function initializeApp(appsettingService: AppsettingService): () => any {
  return () => appsettingService.loadAppsetting().subscribe(appsetting => {
    appsettingService.setAppsetting(appsetting);
  });
}

@NgModule({
  declarations: [
    AppComponent,
    MasterLayoutComponent,
    HomeLayoutComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
  ],
  imports: [
    ScrollingModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule ,
    NgScrollbarModule,
    MaterialModule,
    CommonModule,
    NgbModule,LoaderModule,
    BrowserAnimationsModule,
    // NgxMaterialTimepickerModule,
    NgIdleModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      enableHtml: true
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

  ],
  providers: [AuthGuard, SSOLoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    NgbActiveModal, MaterialModule,
    AppsettingService, {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppsettingService],
      multi: true
    },
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
