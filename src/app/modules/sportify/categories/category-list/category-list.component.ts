import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Category} from "../../../../core/model/category";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {CategoryService} from "../../../../core/service/category.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{
  categoriesArr: Category[] = [];
  term = '';
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions?: Observable<string[]>;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        return this._filter(value || '');
      }),
    );
  }

  private getAllCategories(){
    this.categoryService.getCategories({pageSize: 10, pageNumber: 0}).subscribe(
      res => {
        this.categoriesArr = res.items;
      }
    )
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
