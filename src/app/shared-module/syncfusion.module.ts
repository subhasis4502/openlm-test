import {ModuleWithProviders, NgModule} from "@angular/core";
import {
  ColumnMenuService,
  ExcelExportService,
  GridModule,
  PageService,
  ReorderService,
  ResizeService,
  SearchService,
  SortService
} from "@syncfusion/ej2-angular-grids";
import {ButtonModule, CheckBoxModule, RadioButtonModule, SwitchModule} from "@syncfusion/ej2-angular-buttons";
import {CheckBoxSelectionService, DropDownListModule} from "@syncfusion/ej2-angular-dropdowns";
import {ToastModule} from "@syncfusion/ej2-angular-notifications";
import {MenuModule, SidebarModule} from "@syncfusion/ej2-angular-navigations";
import {DialogModule, TooltipModule} from "@syncfusion/ej2-angular-popups";
import {NumericTextBoxModule, TextBoxModule} from "@syncfusion/ej2-angular-inputs";
import {enableRipple} from '@syncfusion/ej2-base';
import { DatePickerModule } from "@syncfusion/ej2-angular-calendars";


enableRipple(true);

@NgModule({
  exports: [
    ToastModule,
    CheckBoxModule,
    ButtonModule,
    DatePickerModule,
    TooltipModule,
    RadioButtonModule,
    GridModule,
    MenuModule,
    SidebarModule,
    TextBoxModule,
    DropDownListModule,
    SwitchModule,
    DialogModule,
    NumericTextBoxModule
  ]
})
export class SyncfusionModule {

  static forRoot(): ModuleWithProviders<SyncfusionModule> {
    return {
      ngModule: SyncfusionModule,
      providers: [
        SortService,
        ResizeService,
        ReorderService,
        ColumnMenuService,
        ExcelExportService,
        PageService,
        CheckBoxSelectionService,
        SearchService
      ]
    }
  }
}
