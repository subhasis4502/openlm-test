import {IFilterDateRangePickerValue, Utils} from "@openlm/openlm-common";
import {FormGroup} from "@angular/forms";

export function getErroMesage(err: any): string {
  switch (err.status) {
    case 401:
      return err.statusText;
    case 404:
      return err.statusText;
    default:
      return Utils.parseRestApiError(err);
  }
}

export function getAdjustedStartDate(startDate: Date): Date {
  return new Date(
    Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0, 0)
  );
}

export function getAdjustedEndDate(endDate: Date): Date {
  return new Date(
    Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59, 999)
  );
}

export function convertWininfStringToDateRange(durationWithin: number, daysMonthsYears: string): IFilterDateRangePickerValue {

  let endDate: Date = new Date();
  if (daysMonthsYears === 'days') {
    endDate = new Date(
      Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + durationWithin, 23, 59, 59, 999)
    )
  } else if (daysMonthsYears === 'months') {
    endDate = new Date(
      Date.UTC(endDate.getFullYear(), endDate.getMonth() + durationWithin, endDate.getDate(), 23, 59, 59, 999)
    )
  } else if (daysMonthsYears === 'years') {
    endDate = new Date(
      Date.UTC(endDate.getFullYear() + durationWithin, endDate.getMonth(), endDate.getDate(), 23, 59, 59, 999)
    )
  }
  return {
    startDateUtc: getAdjustedStartDate(new Date()).toISOString(),
    endDateUtc: getAdjustedEndDate(endDate).toISOString()
  }
}

export function convertToDateString(jsDate: Date): string {
  return getAdjustedStartDate(jsDate).toISOString();
}

export function resetFormValues(filterFormGroup: FormGroup): void {
  for (const control in filterFormGroup.controls) {
    if (!!filterFormGroup.controls[control].value.length) {
      filterFormGroup.controls[control].setValue([]);
    }
  }
}


