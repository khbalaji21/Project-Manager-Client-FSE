import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  //transform(value: any, args?: any): any {
  //  return null;
  //}

  //transform(items: any[], searchText: string): any[] {
  //  if (!items) return [];
  //  if (!searchText) return items;
  //  searchText = searchText.toLowerCase();
  //  return items.filter(it => {
  //    return it.toLowerCase().includes(searchText);
  //  });
  //}

  transform(json: any[], args: any[]): any[] {
    var searchText = args[0];
    var jsonKey = args[1];

    // json = undefined, args = (2) [undefined, "name"]
    if (searchText == null || searchText == 'undefined') return json;
    if (jsonKey == null || jsonKey == 'undefined') return json;

    // Copy all objects of original array into new Array.
    var returnObjects = json;
    json.forEach(function (filterObjectEntery) {

      if (filterObjectEntery.hasOwnProperty(jsonKey)) {
        console.log('Search key is available in JSON object.');

        if (typeof filterObjectEntery[jsonKey] != "undefined" &&
          filterObjectEntery[jsonKey].toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
          // object value contains the user provided text.
        } else {
          // object didn't match a filter value so remove it from array via filter
          returnObjects = returnObjects.filter(obj => obj !== filterObjectEntery);
        }
      } else {
        console.log('Search key is not available in JSON object.');
      }

    })
    return returnObjects;
  }

}
