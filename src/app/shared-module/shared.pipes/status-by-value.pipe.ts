import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'statusByValue'
})
export class StatusByValuePipe implements PipeTransform {

  transform(value: number): string {
    return `${(value === -1 ? 'N/A' : (value === -99 ? 'Unlimited' : value))}`;
  }

}
