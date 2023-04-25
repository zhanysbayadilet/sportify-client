import {Component, Inject} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {User} from "../../../../core/model/user";
import {TokenStorageService} from "../../../../core/service/token-storage.service";
import {UserService} from "../../../../core/service/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../../../core/service/category.service";
import {Team} from "../../../../core/model/team";
import {MatTableDataSource} from "@angular/material/table";
import {TeamService} from "../../../../core/service/team.service";

@Component({
  selector: 'app-team-form-dialog',
  templateUrl: './team-form-dialog.component.html',
  styleUrls: ['./team-form-dialog.component.css']
})
export class TeamFormDialogComponent {
  formGroup!: UntypedFormGroup;
  categories: any;
  team: Team = new Team();
  user: User = new User();
  displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  users: User[] = [];
  searchUser: any;
  selectedMembers: User[] | undefined = [];
  constructor(private token: TokenStorageService,
              private userService: UserService,
              public dialogRef: MatDialogRef<TeamFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private categoryService: CategoryService,
              private teamService: TeamService,
              private _formBuilder: UntypedFormBuilder) {
    if (data.team){
      this.team = data.team;
      this.selectedMembers = this.team.members;
      this.refreshTableData();
    }
    this.getUser();
    this.getAllCategories();
    this.getUsers();
  }

  refreshTableData(){
    this.dataSource = new MatTableDataSource(this.selectedMembers);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.formGroup = this._formBuilder?.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(30)]],
      categoryId: ['', [Validators.required]],
      adminId: [''],
      members: ['']
    });
  }

  private getUser(){
    const user = this.token.getUserInToken();
    this.userService.getUser(user.id).subscribe(res => {
      if(res){
        this.user = res;
      }
    });
  }

  private getAllCategories(){
    this.categoryService.getCategories({pageSize: 10, pageNumber: 0}).subscribe(
      res => {
        this.categories = res.items;
      }
    )
  }

  saveTeam() {
    this.formGroup.value.adminId = this.user.id;
    this.formGroup.value.members = this.selectedMembers;
    if (this.data.team) {
      this.formGroup.value.id = this.data.team.id;
    }
    this.teamService.saveTeam(this.formGroup.value).subscribe(res => {
      if (res) {
        this.dialogRef.close();
      }
    });
  }

  getUsers(){
    this.userService.getUsers().subscribe(res => {
      // this.users = res;
      console.log('this.users', res)
    });
  }

  getUserByUsername() {
    this.users = [];
    this.userService.getUserByUsername({username: this.searchUser}).subscribe(users => {
      users.forEach((user) => {
        this.users.push(user);
      });
    });
  }

  addMember(e: any) {
    console.log('e.option.value', e.option.value)
    if (e.option.value) {
      this.selectedMembers?.push(e.option.value);
    }
    this.refreshTableData();
  }

  deleteMember(user: User) {
    if (this.selectedMembers){
      const indexToDelete = this.selectedMembers.findIndex(member => member.id = user.id);

      if (indexToDelete !== -1) {
        this.selectedMembers.splice(indexToDelete, 1);
      }
      this.refreshTableData();
    }
  }
}
