import {NgModule} from "@angular/core";
import {OpenLMCommonModule} from "@openlm/openlm-common";
import {SvgIconsModule} from "@ngneat/svg-icon";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SyncfusionModule} from './syncfusion.module';
import {HttpClientModule} from '@angular/common/http';
import {completeIconSet} from "../../assets/svg/svg-icons";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GraphQLModule} from "./graphql.module";
import {StatusByDatePipe} from "./shared.pipes/status-by-date.pipe";
import {StatusByValuePipe} from "./shared.pipes/status-by-value.pipe";
import {SharedPackageChildrenComponent} from "./shared.components/shared.package-children/shared-package-children.component";
import {FieldNameToHeaderTextPipe} from "./shared.pipes/field-name-to-header-text.pipe";

@NgModule({
  declarations: [
    StatusByDatePipe,
    StatusByValuePipe,
    FieldNameToHeaderTextPipe,
    SharedPackageChildrenComponent
  ],
  imports: [
    BrowserAnimationsModule,
    OpenLMCommonModule,
    GraphQLModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SvgIconsModule.forRoot({
      sizes: {
        sm: '1.4rem',
        md: '2.0rem',
        lg: '2.4rem'
      },
      defaultSize: "lg",
      icons: completeIconSet
    }),
    SyncfusionModule.forRoot(),
  ],
  providers: [
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    OpenLMCommonModule,
    GraphQLModule,
    SvgIconsModule,
    StatusByDatePipe,
    StatusByValuePipe,
    FieldNameToHeaderTextPipe,
    SyncfusionModule,
    SharedPackageChildrenComponent
  ]
})

export class SharedModule {

}
