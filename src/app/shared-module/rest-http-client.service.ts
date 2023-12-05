import {Injectable} from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

interface IRestApiResponse {
  Data: any;
}

@Injectable({providedIn: 'root'})
export class RestHttpClient extends HttpClient {

  constructor(handler: HttpHandler) {
    super(handler);
  }

  public getMethod<T>(url: string, options?: {}): Observable<T> {
    return super.get<T>(url, options);
  }

  public override get<T>(url: string, model: any, options?: {}, isArray?: boolean): Observable<T> {
    return super.get<IRestApiResponse>(url, options)
        .pipe(
            map(s =>  !isArray
                  ? this.transformKeyCasing<T>(s?.Data ?? s, model)
                  : (s?.Data ?? s).map((data: {}) => this.transformKeyCasing<T>(data, model))
            )
        );
  }

  public getArray<T>(url: string, model: any, options?: {}): Observable<T> {
    return super.get<IRestApiResponse>(url, options)
        .pipe(
            map(s => this.transformKeyCasing<T>(s, model))
        );
  }

  public getPaginated<T>(
      url: string,
      options: { headers?: HttpHeaders, params?: HttpParams },
      model: T,
      parseDataPropOnly: boolean = true
  ): Observable<T> {
    return super.get<IRestApiResponse>(url, options)
        .pipe(
            map(s => this.transformKeyCasing<T>(parseDataPropOnly ? s.Data : s, model))
        );
  }



  public override post<T, U>(url: string, data: T, model: {}, options?: {}, responseSerializationModel?: any|null): Observable<U> {
    const reqBody = this.transformKeyCasing(data, model);

    return super.post<IRestApiResponse>(url, reqBody, options)
        .pipe(
            map(s => s?.Data || s),
            map(s => !!responseSerializationModel ? this.transformKeyCasing(s, responseSerializationModel) : s)
        );
  }

  public patchMethod<T>(url: string, data: T, headers?: {}, model?: {}): Observable<void> {
    const reqBody = !!model
        ? this.transformKeyCasing(data, model)
        : data;

    return super.patch<void>(url, reqBody);
  }

  public override patch<T, U>(
      url: string,
      data: T,
      requestSerializationModel?: {},
      responseSerializationModel?: U,
      noRecursiveSerialization?: boolean
  ): Observable<U> {
    const reqBody = !!requestSerializationModel
        ? this.transformKeyCasing(data, requestSerializationModel)
        : data;

    return super.patch<U>(url, reqBody)
        .pipe(
            map(v => !!responseSerializationModel ? this.transformKeyCasing(v, responseSerializationModel, noRecursiveSerialization) : v)
        );
  }

  public deleteMethod(url: string, params?: HttpParams): Observable<void> {
    return this.delete<void>(url, {params});
  }

  public override put<T, U>(url: string, body: T, model?: any, options?: {}): Observable<U> {
    const reqBody = !!model
        ? this.transformKeyCasing(body, model)
        : body;

    return super.put<U>(url, reqBody, options);
  }

  private transformKeyCasing<T>(modelToTransform: any, modelToTransformTo: T, noRecursiveSerialization?: boolean): T {
    if (!modelToTransformTo) {
      return modelToTransform as T;
    }

    return Object.keys(modelToTransform).reduce((response, key) => {
      const newKey = Object.keys(modelToTransformTo).find(k => k.toLowerCase() === key.toLowerCase());

      if (newKey !== undefined) {

        if (!noRecursiveSerialization) {
          // Object recursive serialization.
          if (typeof modelToTransform[key] === 'object' && modelToTransform[key] !== null && modelToTransform[key]?.length === undefined) {
            (response as any)[newKey] = this.transformKeyCasing(modelToTransform[key], modelToTransformTo);
          }

          // Array serialization.
          if (typeof modelToTransform[key] === 'object' && Array.isArray(modelToTransform[key])) {
            (response as any)[newKey] = modelToTransform[key].map((o: any) => this.transformKeyCasing(o, modelToTransformTo));
          }
        }

        // Primitive value serialization.
        if (
          noRecursiveSerialization
          || (typeof modelToTransform[key] === 'object' && modelToTransform[key] === null)
          || typeof modelToTransform[key] !== 'object'
        ) {
          (response as any)[newKey] = modelToTransform[key];
        }
      }

      return response;
    }, {} as T);
  }
}

