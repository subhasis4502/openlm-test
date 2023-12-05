import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {
  GraphQLResponse, IFilterPageInfo, IOffsetPaginatedResponse
} from '@openlm/openlm-common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  fetchFeatureNameFilterDataSource,
  fetchLicenseTypeFilterDataSource,
  fetchServerNameFilterDataSource,
  fetchVendorNameFilterDataSource,
} from './license-dimension-features-filters.graphql';
import {IServerFilterItem, IVendorFilterItem} from "../../../../shared-module/shared.interfaces";

@Injectable()
export class LicenseDimensionFeaturesFiltersApiService {
  constructor(private apollo: Apollo) {
  }

  public getServerNameFilterDataSource<T>(pageInfo?: IFilterPageInfo<T>): Observable<IOffsetPaginatedResponse<IServerFilterItem>> {
    return this.apollo
      .use('operationalData')
      .query<GraphQLResponse<'serversFilter', IOffsetPaginatedResponse<IServerFilterItem>>>(fetchServerNameFilterDataSource(pageInfo))
      .pipe(
        map((result) => result.data.serversFilter)
      );
  }

  public getFeatureNameFilterDataSource<T>(pageInfo?: IFilterPageInfo<T>): Observable<IOffsetPaginatedResponse<string>> {
    return this.apollo
      .use('operationalData')
      .query<GraphQLResponse<'featuresFilter', IOffsetPaginatedResponse<string>>>(fetchFeatureNameFilterDataSource(pageInfo))
      .pipe(
        map((result) => result.data.featuresFilter)
      );
  }

  public getVendorNameFilterDataSource<T>(pageInfo?: IFilterPageInfo<T>): Observable<IOffsetPaginatedResponse<IVendorFilterItem>> {
    return this.apollo
      .use('operationalData')
      .query<GraphQLResponse<'vendorsFilter', IOffsetPaginatedResponse<IVendorFilterItem>>>(fetchVendorNameFilterDataSource(pageInfo))
      .pipe(
        map(result => result.data.vendorsFilter)
      );
  }

  public getHostNameFilterDataSource<T>(pageInfo?: IFilterPageInfo<T>): Observable<IOffsetPaginatedResponse<string>> {
    return this.apollo
      .use('operationalData')
      .query<GraphQLResponse<'vendorsFilter', IOffsetPaginatedResponse<string>>>(fetchVendorNameFilterDataSource(pageInfo))
      .pipe(
        map(result => result.data.vendorsFilter)
      );
  }

  public getLicenseTypeFilterDataSource<T>(): Observable<string[]> {
    return this.apollo
      .use('operationalData')
      .query<GraphQLResponse<'licenseTypesFilter', string[]>>(fetchLicenseTypeFilterDataSource())
      .pipe(map((result) => result.data.licenseTypesFilter));
  }
}
