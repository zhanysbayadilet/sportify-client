import {Component, OnInit} from '@angular/core';
import { Category } from 'src/app/core/model/category';
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {Tournament} from "../../../core/model/tournament";
import {PageEvent} from "@angular/material/paginator";
import {TournamentService} from "../../../core/service/tournament.service";
import {CategoryService} from "../../../core/service/category.service";
import {TokenStorageService} from "../../../core/service/token-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {
  TournamentFormDialogComponent
} from "../../sportify/profile/tournament-form-dialog/tournament-form-dialog.component";

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit{

  categories: Category[] = [];
  category: Observable<Category> = new Observable<Category>();
  showAdminBoard = false;
  isLoggedIn = false;
  private roles: string[] = [];
  private params: any;
  pageSize = 10;
  searchText?: string;
  displayedColumns: string[] = ['index', 'id', 'name', 'startDate', 'endDate', 'prizeFund',
    'category', 'organizer', 'status', 'actions'];
  dataSource = new MatTableDataSource<Tournament>();
  length = 50;
  pageIndex = 0;
  disabled = false;
  pageEvent?: PageEvent;
  filterModel = {
    filter: {
      searchText: null,
      fromDate: null,
      untilDate: null,
      categories: null
    }
  };

  constructor(private tournamentService: TournamentService,
              private categoryService: CategoryService,
              private tokenStorageService: TokenStorageService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getUserInToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUserInToken();
      // this.roles = user.roles;
      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }
    this.getAllTournaments();
  }

  public getAllTournaments(){
    this.params = null;
    this.params = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex,
    };

    if (this.searchText !== undefined ) {
      this.params.searchText = this.searchText;
    }

    this.tournamentService.getTournaments(this.params, this.filterModel.filter).subscribe(res => {
        this.dataSource = res.items;
        this.length = res.total;
      }
    );
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(TournamentFormDialogComponent, {
      data: {
        title: 'Create tournament',
        action: 'Create'
      },
      minWidth: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllTournaments();
    });
  }


  openEditDialog(tournament: any): void {
    const dialogRef = this.dialog.open(TournamentFormDialogComponent, {
      data: {
        title: 'Edit tournament',
        action: 'Save',
        tournament: tournament
      },
      minWidth: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllTournaments();
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getAllTournaments();
  }

  delete(id: any) {
    this.tournamentService.deleteTournament(id).subscribe(res => {
      console.log("Successfully deleted!");
      this.getAllTournaments();
    })
  }
}
