import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared-module/shared.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {Interceptor} from "./shared-module/http.interceptor";
import {GraphQLModule} from "./shared-module/graphql.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LicenseDimensionFeaturesModuleComponent } from './modules/license-dimension-module/license-dimension-features.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    GraphQLModule,
    LicenseDimensionFeaturesModuleComponent,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
