import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Tournament} from "../../../../core/model/tournament";
import {User} from "../../../../core/model/user";
import {City} from "../../../../core/model/city";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {TokenStorageService} from "../../../../core/service/token-storage.service";
import {UserService} from "../../../../core/service/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../../../core/service/category.service";
import {TournamentService} from "../../../../core/service/tournament.service";

@Component({
  selector: 'app-tournament-form-dialog',
  templateUrl: './tournament-form-dialog.component.html',
  styleUrls: ['./tournament-form-dialog.component.css']
})
export class TournamentFormDialogComponent implements OnInit{
  formGroup!: UntypedFormGroup;
  categories: any;
  tournament: Tournament = new Tournament();
  user: User = new User();
  cityList: City[] = [];
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  constructor(private token: TokenStorageService,
              private userService: UserService,
              public dialogRef: MatDialogRef<TournamentFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private categoryService: CategoryService,
              private tournamentService: TournamentService,
              private _formBuilder: UntypedFormBuilder) {
    if (data.tournament){
      this.tournament = data.tournament;
    }
    this.getUser();
    this.getAllCategories();
    this.getCityList();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.formGroup = this._formBuilder?.group({
      id: [],
      name: ['', [Validators.required, Validators.maxLength(30)]],
      subtitle: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      prizeFund: ['', Validators.required],
      city: ['', Validators.required],
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      organizer: [],
      status: []
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

  saveTournament() {
    this.formGroup.value.organizer = this.user;
    if (this.data.tournament) {
      this.formGroup.value.id = this.data.tournament.id;
      this.formGroup.value.status = this.data.tournament.status;
    }
    this.tournamentService.saveTournament(this.formGroup.value).subscribe(res => {
      if (res) {
        this.dialogRef.close();
      }
    })
  }

  getCityList(){
    this.tournamentService.getCityList().subscribe(res => {
      if (res){
        this.cityList = res;
      }
    });
  }
}
