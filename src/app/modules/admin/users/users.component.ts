import {Component, OnInit} from '@angular/core';
import {User} from "../../../core/model/user";
import {Category} from "../../../core/model/category";
import {MatTableDataSource} from "@angular/material/table";
import {PageEvent} from "@angular/material/paginator";
import {UserService} from "../../../core/service/user.service";
import {TokenStorageService} from "../../../core/service/token-storage.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  user: User = new User();
  showAdminBoard = false;
  isLoggedIn = false;
  private roles: string[] = [];
  category: Category = new Category();
  displayedColumns: string[] = ['index', 'id', 'username', 'email', 'roles', 'actions'];
  dataSource = new MatTableDataSource();
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  disabled = false;
  pageEvent?: PageEvent;
  searchText: any;

  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getUserInToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUserInToken();
      // this.roles = user.roles;
      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }

    this.getAllUsers();
  }

  private getAllUsers(){
    this.userService.getUsers().subscribe(
      users => {
        this.dataSource = users;
      }
    )
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getAllUsers();
  }

}
