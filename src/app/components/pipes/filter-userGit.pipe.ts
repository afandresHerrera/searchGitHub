import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FilterGit'
})
export class FilterUserGit implements PipeTransform {

  transform(value: any, arg: any): any {
    console.log(value);
    console.log(arg);

    if (value == null) {
      return [];
    }
    if (arg == null) {
      return value;
    }
    return value.score < 0.4 ? 'BAJO' : (value.score < 0.7 && value.score >= 0.4 ? 'MEDIO' : 'ALTO');

  }

}
