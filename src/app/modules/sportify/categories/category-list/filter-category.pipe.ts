import { Pipe, PipeTransform } from '@angular/core';
import {Category} from "../../../../core/model/category";

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(products: Category[], search: string): Category[] {
    // @ts-ignore
    return products.filter(p => p.enName.toLowerCase().includes(search.toLowerCase()));
  }

}
