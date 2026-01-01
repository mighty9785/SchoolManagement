import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnquiryRoutingModule } from './enquiry-routing.module';
import { EnquiryComponent } from './enquiry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '../Shared/loader/loader.module';
import { TableSearchFilterModule } from '../../Pipes/table-search-filter.module';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    EnquiryComponent
  ],
  imports: [
    CommonModule,
    EnquiryRoutingModule,
    NgSelectModule, NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoaderModule,
    TableSearchFilterModule,
  ]
})
export class EnquiryModule { }
