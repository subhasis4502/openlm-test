import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {
  IGraphQLPaginationBuilder,
  IGraphQLSortingBuilder,
  ICursorPaginatedResponse,
  GraphQLResponse
} from '@openlm/openlm-common';
import {Observable} from 'rxjs';
import {ILicenseDimension} from './license-dimension-features.interface';
import {
  fetchLicenseDimensionsQuery,
  updateFeatureMutation
} from './license-dimension-features.graphql';
import {map} from 'rxjs/operators';
import {IFeatureSelectedFilterOptions} from "../license-dimension-features-filters/license-dimension-features-filters.interface";

@Injectable()
export class LicenseDimensionFeaturesApiService {
  constructor(
    private apollo: Apollo,
  ) {
  }

  public getLicenseDimensions = (
    filterOptions: IFeatureSelectedFilterOptions,
    visibleColumns?: (keyof ILicenseDimension)[],
    paginationInfo?: IGraphQLPaginationBuilder,
    sortingInfo?: IGraphQLSortingBuilder
  ): Observable<ICursorPaginatedResponse<ILicenseDimension>> =>
    this.apollo
      .use('testData')
      .query<GraphQLResponse<'LicenseDimension',
        ICursorPaginatedResponse<ILicenseDimension>>>(fetchLicenseDimensionsQuery(visibleColumns, filterOptions, paginationInfo, sortingInfo))
      .pipe(map(result => result.data.LicenseDimension));
}
