import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fieldNameToHeaderText'
})
export class FieldNameToHeaderTextPipe implements PipeTransform {
  transform(fieldName: string): string {

    return fieldName.replace(/([A-Z])/g, ' $1').trim();
  }
}
