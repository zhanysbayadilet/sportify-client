import {Component, OnInit} from '@angular/core';
import {Category} from "../../../core/model/category";
import {MatTableDataSource} from "@angular/material/table";
import {PageEvent} from "@angular/material/paginator";
import {CategoryService} from "../../../core/service/category.service";
import {TokenStorageService} from "../../../core/service/token-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {CategoryDialogComponent} from "./category-dialog/category-dialog.component";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  category: Category = new Category();
  showAdminBoard = false;
  isLoggedIn = false;
  private roles: string[] = [];
  object:Object = Object.keys(this.category).length
  displayedColumns: string[] = ['index', 'id', 'name', 'img', 'description', 'actions'];
  dataSource = new MatTableDataSource();
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  disabled = false;
  pageEvent?: PageEvent;
  searchText: any;
  params: any;

  constructor(private categoryService: CategoryService,
              private tokenStorageService: TokenStorageService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getUserInToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUserInToken();
      // this.roles = user.roles;
      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }

    this.getAllCategories();
  }

  private getAllCategories(){
    this.params = null;
    this.params = {
      pageNumber: this.pageIndex,
      pageSize: this.pageSize
    }
    this.categoryService.getCategories(this.params).subscribe(res => {
        this.dataSource = res.items;
        this.length = res.total;
      }
    )
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: {
        title: 'Create category',
        action: 'Create'
      },
      minWidth: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCategories();
    });
  }


  openEditDialog(category: any): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: {
        title: 'Edit category',
        action: 'Save',
        category: category
      },
      minWidth: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCategories();
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getAllCategories();
  }

  delete(id: any) {
    this.categoryService.deleteCategory(id).subscribe(res => {
      if (res){
        console.log("Successfully deleted!");
        this.getAllCategories();
      }
    })
  }
}
