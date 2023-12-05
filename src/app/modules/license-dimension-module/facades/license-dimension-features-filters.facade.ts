import {IFilterLoadDataOptions, IFilterPageInfo, IFormControlBuilder, ToastService, Utils} from "@openlm/openlm-common";
import {lastValueFrom, Observable} from 'rxjs';
import {DirtyCheckPlugin, transaction} from "@datorama/akita";
import {Injectable} from "@angular/core";
import {LicenseDimensionFeaturesFiltersQuery, LicenseDimensionFeaturesFiltersStore} from "../states/license-dimension-features-filters";
import {LicenseDimensionFeaturesQuery, LicenseDimensionFeaturesStore} from "../states/license-dimension-features";
import {
  IFeatureSelectedFilterOptions
} from "../apis/license-dimension-features-filters/license-dimension-features-filters.interface";
import { LicenseDimensionFeaturesFiltersApiService } from "../apis/license-dimension-features-filters/license-dimension-features-filters.api.service";

@Injectable()
export class LicenseDimensionFeaturesFiltersFacade {
  constructor(
    private query: LicenseDimensionFeaturesQuery,
    private store: LicenseDimensionFeaturesStore,
    private filterStore: LicenseDimensionFeaturesFiltersStore,
    private filterQuery: LicenseDimensionFeaturesFiltersQuery,
    private apiService: LicenseDimensionFeaturesFiltersApiService,
    private toastService: ToastService
  ) {
  }

  public selectedFilterOptionsDirtyCheckPlugin: DirtyCheckPlugin = new DirtyCheckPlugin(
    this.filterQuery,
    {
      watchProperty: [
        'selectedFeatureNames',
        'selectedHostNames',
        'selectedServerNames',
        'selectedLicenseTypes',
        'selectedVendorNames'
      ]
    }
  );

  public loadServerNameFilterDataSource = async (
    options: IFilterLoadDataOptions
  ): Promise<void> => {
    try {
      const pageInfo: IFilterPageInfo<string> = {
        ...this.filterQuery.getValue().serverName,
        page: options.nextPage,
        searchTerm: options.searchTerm
      };

      const serverNameDataSource = await lastValueFrom(this.apiService
        .getServerNameFilterDataSource(pageInfo))

      this.filterStore.update({
        serverName: {
          ...pageInfo,
          data: serverNameDataSource!.items.map(i => i.description),
          page: pageInfo.page,
          totalPages: Math.ceil(
            serverNameDataSource!.totalCount / pageInfo.pageSize
          )
        }
      });
    } catch (error) {
      this.toastService.triggerToast({
        message: Utils.parseGraphQlErrors(error),
        type: 'ERROR'
      });
    }
  };

  public loadFeatureNameFilterDataSource = async (
    options: IFilterLoadDataOptions
  ): Promise<void> => {
    try {
      const pageInfo: IFilterPageInfo<string> = {
        ...this.filterQuery.getValue().featureName,
        page: options.nextPage,
        searchTerm: options.searchTerm
      };
      const featureNameDataSource = await lastValueFrom(this.apiService
        .getFeatureNameFilterDataSource(pageInfo))

      this.filterStore.update({
        featureName: {
          ...pageInfo,
          data: featureNameDataSource!.items,
          page: pageInfo.page,
          totalPages: Math.ceil(
            featureNameDataSource!.totalCount / pageInfo.pageSize
          )
        }
      });
    } catch (error) {
      this.toastService.triggerToast({
        message: Utils.parseGraphQlErrors(error),
        type: 'ERROR'
      });
    }
  };

  public loadVendorNameFilterDataSource = async (
    options: IFilterLoadDataOptions
  ): Promise<void> => {
    try {
      const pageInfo: IFilterPageInfo<string> = {
        ...this.filterQuery.getValue().vendorName,
        page: options.nextPage,
        searchTerm: options.searchTerm
      };
      const vendorNameDataSource = await lastValueFrom(this.apiService
        .getVendorNameFilterDataSource(pageInfo))

      this.filterStore.update({
        vendorName: {
          ...pageInfo,
          data: vendorNameDataSource!.items.map(i => i.vendor),
          page: pageInfo.page,
          totalPages: Math.ceil(
            vendorNameDataSource!.totalCount / pageInfo.pageSize
          )
        }
      });
    } catch (error) {
      this.toastService.triggerToast({
        message: Utils.parseGraphQlErrors(error),
        type: 'ERROR'
      });
    }
  };

  public loadLicenseTypeFilterDataSource = async (
    options: IFilterLoadDataOptions
  ): Promise<void> => {
    try {
      const pageInfo: IFilterPageInfo<string> = {
        ...this.filterQuery.getValue().vendorName,
        page: options.nextPage,
        searchTerm: options.searchTerm
      };
      const licenseTypeDataSource = await lastValueFrom(this.apiService
        .getLicenseTypeFilterDataSource())

      this.filterStore.update({
        licenseType: {
          ...pageInfo,
          data: licenseTypeDataSource!,
          page: pageInfo.page,
          totalPages: Math.ceil(
            licenseTypeDataSource!.length / pageInfo.pageSize
          )
        }
      });
    } catch (error) {
      this.toastService.triggerToast({
        message: Utils.parseGraphQlErrors(error),
        type: 'ERROR'
      });
    }
  };

  public loadHostNameFilterDataSource = async (
    options: IFilterLoadDataOptions
  ): Promise<void> => {
    try {
      const pageInfo: IFilterPageInfo<string> = {
        ...this.filterQuery.getValue().hostName,
        page: options.nextPage,
        searchTerm: options.searchTerm
      };
      const hostNameDataSource = await lastValueFrom(this.apiService
        .getHostNameFilterDataSource(pageInfo))

      this.filterStore.update({
        hostName: {
          ...pageInfo,
          data: hostNameDataSource!.items,
          page: pageInfo.page,
          totalPages: Math.ceil(
            hostNameDataSource!.totalCount / pageInfo.pageSize
          )
        }
      });
    } catch (error) {
      this.toastService.triggerToast({
        message: Utils.parseGraphQlErrors(error),
        type: 'ERROR'
      });
    }
  };

  public getServerNamesData(): Observable<IFilterPageInfo<string>> {
    return this.filterQuery.select(f => f.serverName);
  }

  public getVendorNamesData(): Observable<IFilterPageInfo<string>> {
    return this.filterQuery.select(f => f.vendorName);
  }

  public getFeatureNamesData(): Observable<IFilterPageInfo<string>> {
    return this.filterQuery.select(f => f.featureName);
  }

  public getLicenseTypesData(): Observable<IFilterPageInfo<string>> {
    return this.filterQuery.select(f => f.licenseType);
  }

  public getHostNamesData(): Observable<IFilterPageInfo<string>> {
    return this.filterQuery.select(f => f.hostName);
  }

  public getAreFiltersActiveObservable(): Observable<boolean> {
    return this.query.select(q => q.licenseDimensionsUIState.areFiltersActive);
  }

  public getFilterFormValues(): IFormControlBuilder<IFeatureSelectedFilterOptions>[] {
    return this.filterQuery.getFilterFormValues();
  }

  public getSelectedFilterValues(): IFeatureSelectedFilterOptions {
    const query = this.filterQuery.getValue();

    return {
      selectedFeatureNames: query.selectedFeatureNames,
      selectedLicenseTypes: query.selectedLicenseTypes,
      selectedVendorNames: query.selectedVendorNames,
      selectedServerNames: query.selectedServerNames,
      selectedHostNames: query.selectedHostNames,
    }
  }

  public getSelectedFilterFormValues$(): Observable<IFeatureSelectedFilterOptions> {
    return this.filterQuery.select(item => ({
        selectedVendorNames: item.selectedVendorNames,
        selectedLicenseTypes: item.selectedLicenseTypes,
        selectedFeatureNames: item.selectedFeatureNames,
        selectedServerNames: item.selectedServerNames,
        selectedHostNames: item.selectedHostNames,
      })
    )
  }

  public shouldLoadNewData = (): boolean => this.selectedFilterOptionsDirtyCheckPlugin.isDirty();

  public updateSelectedFilterOptions = (selectedFilterOptions: IFeatureSelectedFilterOptions): void =>
    this.filterStore.updateSelectedFilterOptions(selectedFilterOptions);


  @transaction()
  public updateFilterActivityState(): void {
    const areFiltersActive = this.query.getValue().licenseDimensionsUIState
      .areFiltersActive;

    this.store.update(state => ({
      ...state,
      licenseDimensionsUIState: {
        ...state.licenseDimensionsUIState,
        areFiltersActive: !areFiltersActive
      }
    }));

    if (areFiltersActive) {
      this.filterStore.reset();
    }
  }

  public resetFilterStore(): void {
    this.filterStore.reset();
  }
}
