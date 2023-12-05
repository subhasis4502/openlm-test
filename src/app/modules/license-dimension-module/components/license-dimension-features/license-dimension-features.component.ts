import {Component, OnDestroy, OnInit} from '@angular/core';
import {ITableData, UIState, Utils} from '@openlm/openlm-common';
import {LicenseDimensionFeaturesFacade} from '../../facades/license-dimension-features.facade';
import {filter, Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {LicenseDimensionFeaturesFiltersFacade} from '../../facades/license-dimension-features-filters.facade';
import {ILicenseDimension} from "../../apis/license-dimension-features/license-dimension-features.interface";
import {
  IFeatureSelectedFilterOptions
} from "../../apis/license-dimension-features-filters/license-dimension-features-filters.interface";

@UntilDestroy()
@Component({
  selector: 'app-license-dimension-features',
  templateUrl: './license-dimension-features.component.html',
  styleUrls: ['./license-dimension-features.component.scss']
})
export class LicenseDimensionFeaturesComponent implements OnInit, OnDestroy {
  constructor(
    private facade: LicenseDimensionFeaturesFacade,
    private filterFacade: LicenseDimensionFeaturesFiltersFacade,
    private formBuilder: FormBuilder,
  ) {
  }

  private areFiltersActive!: boolean;

  public readonly infoText: string = `
  By utilizing the License Dimension, developers and software architects can efficiently manage and organize crucial license-related information within their applications. 
  `;
  public readonly licenseDimensions$: Observable<ITableData<ILicenseDimension>> = this.facade.licenseDimensions$;
  public readonly areFiltersActive$: Observable<boolean> = this.filterFacade.getAreFiltersActiveObservable();
  public readonly selectedFilterFormValues$: Observable<IFeatureSelectedFilterOptions> =
    this.filterFacade.getSelectedFilterFormValues$();

  public defaultColumns: (keyof ILicenseDimension)[] = this.facade.defaultColumns;
  public filterFormGroup!: FormGroup;

  public featureNameDropDownModel: any = {
    dataSource: this.filterFacade.getFeatureNamesData(),
    formControlName: 'selectedFeatureNames',
    filterLabel: 'Feature Name',
    loadDataFn: this.filterFacade.loadFeatureNameFilterDataSource,
    hasBeenOpenedBefore: false
  }
  public hostNameDropDownModel: any = {
    dataSource: this.filterFacade.getHostNamesData(),
    formControlName: 'selectedHostNames',
    filterLabel: 'Host Name',
    loadDataFn: this.filterFacade.loadHostNameFilterDataSource,
    hasBeenOpenedBefore: false
  }
  public serverNameDropDownModel: any = {
    dataSource: this.filterFacade.getServerNamesData(),
    formControlName: 'selectedServerNames',
    filterLabel: 'Server Name',
    loadDataFn: this.filterFacade.loadServerNameFilterDataSource,
    hasBeenOpenedBefore: false
  }
  public licenseTypeDropDownModel: any = {
    dataSource: this.filterFacade.getLicenseTypesData(),
    formControlName: 'selectedLicenseTypes',
    filterLabel: 'License Type',
    loadDataFn: this.filterFacade.loadLicenseTypeFilterDataSource,
    hasBeenOpenedBefore: false,
    useLocalFiltering: true
  }
  public vendorNameDropDownModel: any = {
    dataSource: this.filterFacade.getVendorNamesData(),
    formControlName: 'selectedVendorNames',
    filterLabel: 'Vendor Name',
    loadDataFn: this.filterFacade.loadVendorNameFilterDataSource,
    hasBeenOpenedBefore: false
  }

  public ngOnInit(): void {
    this.loadLicenseDimensions();

    this.filterFormGroup = Utils.buildFormGroup(
      this.formBuilder,
      this.filterFacade.getFilterFormValues(),
    );

    this.filterFacade.selectedFilterOptionsDirtyCheckPlugin.setHead();

    this.selectedFilterFormValues$
      .pipe(
        untilDestroyed(this),
        filter(this.filterFacade.shouldLoadNewData)
      )
      .subscribe(res => {
        this.filterFormGroup.patchValue(res, {emitEvent: false});
        this.facade.loadLicenseDimensions();
      })

    this.filterFormGroup.valueChanges
      .pipe(
        untilDestroyed(this),
      )
      .subscribe(res => {
        this.filterFacade.updateSelectedFilterOptions(res);
        this.filterFacade.selectedFilterOptionsDirtyCheckPlugin.setHead();
      });

    this.facade.defaultColumns$
      .pipe(untilDestroyed(this))
      .subscribe(res => this.defaultColumns = res);

    this.areFiltersActive$
      .subscribe(res => {
        this.areFiltersActive = res;

        if (!this.areFiltersActive) {
          this.featureNameDropDownModel.hasBeenOpenedBefore = false;
          this.hostNameDropDownModel.hasBeenOpenedBefore = false;
          this.serverNameDropDownModel.hasBeenOpenedBefore = false;
          this.licenseTypeDropDownModel.hasBeenOpenedBefore = false;
          this.vendorNameDropDownModel.hasBeenOpenedBefore = false;
        }
      });
  }

  public loadLicenseDimensions = ($event?: UIState) => this.facade.loadLicenseDimensions($event);

  public toggleFilterButtonState(): void {
    const selectedFilterValues = Object.values(this.filterFacade.getSelectedFilterValues())
      .filter(item => !!item.length);

    this.filterFacade.updateFilterActivityState();

    if (!this.areFiltersActive && !!selectedFilterValues.length) {
      this.filterFormGroup.patchValue(this.filterFacade.getFilterFormValues(), {emitEvent: false});
      this.loadLicenseDimensions();
    }
  }

  public ngOnDestroy(): void {
    this.filterFacade.resetFilterStore();
    this.facade.resetStore();
  }
}
