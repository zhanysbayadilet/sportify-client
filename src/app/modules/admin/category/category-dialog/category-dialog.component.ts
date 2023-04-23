import {Component, Inject, OnInit} from '@angular/core';
import {Category} from "../../../../core/model/category";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../../core/service/category.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit{
  category: Category = new Category();
  formGroup2!: UntypedFormGroup;

  constructor(private _formBuilder: UntypedFormBuilder,
              private categoryService: CategoryService,
              public dialogRef: MatDialogRef<CategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data.category) {
      this.category = data.category;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.formGroup2 = this._formBuilder.group({
      name: ['', [Validators.required]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  saveCategory(){
    console.log(this.formGroup2)
    this.category.enName = this.formGroup2.value.name;
    this.category.img = this.formGroup2.value.img;
    this.category.description = this.formGroup2.value.description;
    this.categoryService.saveCategory(this.category).subscribe(res => {
      if (res) {
        this.dialogRef.close();
      }
    })
  }
}
