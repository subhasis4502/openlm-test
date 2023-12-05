import {Injectable} from '@angular/core';
import {transaction} from '@datorama/akita';
import {
  ToastService,
  ITableData,
  Utils,
  UIState,
} from '@openlm/openlm-common';
import {lastValueFrom, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { LicenseDimensionFeaturesApiService } from '../apis/license-dimension-features/license-dimension-features.api.service';
import {LicenseDimensionFeaturesQuery, LicenseDimensionFeaturesStore} from '../states/license-dimension-features';
import {LicenseDimensionFeaturesFiltersQuery} from "../states/license-dimension-features-filters";
import {ILicenseDimension} from "../apis/license-dimension-features/license-dimension-features.interface";
import {IFeatureSelectedFilterOptions} from "../apis/license-dimension-features-filters/license-dimension-features-filters.interface";

@Injectable()
export class LicenseDimensionFeaturesFacade {
  constructor(
    private query: LicenseDimensionFeaturesQuery,
    private filterQuery: LicenseDimensionFeaturesFiltersQuery,
    private store: LicenseDimensionFeaturesStore,
    private apiService: LicenseDimensionFeaturesApiService,
    private toastService: ToastService
  ) {
  }

  public defaultColumns: (keyof ILicenseDimension)[] = this.query.getValue().defaultGridColumns;

  public defaultColumns$: Observable<(keyof ILicenseDimension)[]> = this.query.select(q => q.defaultGridColumns);
  public visibleColumns$: Observable<(keyof ILicenseDimension)[]> = this.query.select(q => q.visibleGridColumns);

  public licenseDimensions$: Observable<ITableData<ILicenseDimension>> = this.query
    .select(state => state.paginatedResponse)
    .pipe(
      map(r => ({
        result: r.nodes,
        count: r.totalCount
      }))
    );

  @transaction()
  public async loadLicenseDimensions(
    uiState?: Partial<UIState>,
    visibleColumns?: (keyof ILicenseDimension)[]
  ): Promise<void> {
    try {
      this.store.updateVisibleColumns(visibleColumns);
      this.store.updatePaginationState(uiState);
      this.store.updateSorting(uiState);

      const paginationInfo = this.query.getPagination();
      const sortingInfo = this.query.getSorting();
      const visibleGridColumns = this.query.getValue().visibleGridColumns;
      const filterOptions: IFeatureSelectedFilterOptions = this.filterQuery.getFeatureSelectedFilterOptions();

      const paginatedResponse = await lastValueFrom(this.apiService
        .getLicenseDimensions(filterOptions, visibleGridColumns, paginationInfo, sortingInfo));

      this.store.update({paginatedResponse, lastPaginatedRequestOptions: paginationInfo});
    } catch (error) {
      this.toastService.triggerToast({
        message: Utils.parseGraphQlErrors(error),
        type: 'ERROR'
      });
    }
  }

  public resetStore(): void {
    this.store.reset();
  }
}
