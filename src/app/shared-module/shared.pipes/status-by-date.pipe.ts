import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'statusByDate'
})
export class StatusByDatePipe implements PipeTransform {
  transform(date: Date | string, format: string = 'MM/dd/yyyy hh:mm:ss a'): string {
    if (typeof date === "string") {
      date = new Date(date);
    }

    return `${date.getFullYear() === 3000 || date.getFullYear() === 9999 || date.getFullYear() === 2099
      ? 'Permanent' : new DatePipe('en-US').transform(date, format)}`
  }
}
