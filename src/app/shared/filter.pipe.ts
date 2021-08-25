import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(searchName: any, args?: any): any {
   if (!searchName) return null;
    if (!args) return searchName;

    args = args.toLowerCase();
    return searchName.filter(function (data: string) {
      return JSON.stringify(data).toLowerCase().includes(args);
    });
  }
}
