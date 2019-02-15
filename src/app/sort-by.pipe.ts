import { Pipe, PipeTransform } from '@angular/core';
//import { isArray } from 'util';
//import { isNull } from '@angular/compiler/src/output/output_ast';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  static _orderByComparator(a: any, b: any): number {

    if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
      //Isn't a number so lowercase the string to properly compare
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
    }
    else {
      //Parse strings as numbers to compare properly
      if (parseFloat(a) < parseFloat(b)) return -1;
      if (parseFloat(a) > parseFloat(b)) return 1;
    }

    return 0; //equal each other
  }

  transform(value: any, args?: any): any {
    ////return null;
    //if (!Array.isArray(value)) {
    //  alert("This is not an Array");

    //  return value;
    //}
    //alert("This is an Array");
    alert("Entering pipe, value of input is " + JSON.stringify(value));
    alert("Entering pipe, args of input is " + JSON.stringify(args));
    //if (args == null) {
    //  return value;
    //}
    //value.sort()

    if (!Array.isArray(value)) return value;

    if (!Array.isArray(args) || (Array.isArray(args) && args.length == 1)) {
      var propertyToCheck: string = !Array.isArray(args) ? args : args[0];
      var desc = propertyToCheck.substr(0, 1) == '-';

      //Basic array
      if (!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+') {
        return !desc ? value.sort() : value.sort().reverse();
      }
      else {
        var property: string = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
          ? propertyToCheck.substr(1)
          : propertyToCheck;

        return value.sort(function (a: any, b: any) {
          return !desc ?
            SortByPipe._orderByComparator(a[property], b[property])
            : -SortByPipe._orderByComparator(a[property], b[property]);
        });
      }
    }
    else {
      //Loop over property of the array in order and sort
      return value.sort(function (a: any, b: any) {
        for (var i: number = 0; i < args.length; i++) {
          var desc = args[i].substr(0, 1) == '-';
          var property = args[i].substr(0, 1) == '+' || args[i].substr(0, 1) == '-'
            ? args[i].substr(1)
            : args[i];

          var comparison = !desc ?
            SortByPipe._orderByComparator(a[property], b[property])
            : -SortByPipe._orderByComparator(a[property], b[property]);

          //Don't return 0 yet in case of needing to sort by next property
          if (comparison != 0) return comparison;
        }

        return 0; //equal each other
      });
    }

  }
}
