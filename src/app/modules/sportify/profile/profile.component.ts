import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../core/model/user";
import {Tournament} from "../../../core/model/tournament";
import {Category} from "../../../core/model/category";
import {PageEvent} from "@angular/material/paginator";
import {TokenStorageService} from "../../../core/service/token-storage.service";
import {UserService} from "../../../core/service/user.service";
import {TournamentService} from "../../../core/service/tournament.service";
import {CategoryService} from "../../../core/service/category.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {TournamentFormDialogComponent} from "./tournament-form-dialog/tournament-form-dialog.component";
import {TeamService} from "../../../core/service/team.service";
import {Team} from "../../../core/model/team";
import {TeamFormDialogComponent} from "./team-form-dialog/team-form-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  currentUserInToken: any;
  currentUser?: User = new User();
  tournaments?: Tournament[] = [];
  tournament: Tournament = new Tournament();
  categoriesArr: Category[] = [];
  myTournaments?: Tournament[] = [];
  showEditUser = false;
  length = 0;
  length1 = 0
  length2 = 0
  pageSize = 5;
  pageSize1 = 5;
  pageSize2 = 5;
  pageIndex = 0;
  pageIndex1 = 0;
  pageIndex2 = 0;
  pageEvent?: PageEvent;
  pageEvent1?: PageEvent;
  pageEvent2?: PageEvent;
  private params: any;
  myTeams: Team[] = [];

  constructor(private token: TokenStorageService,
              private userService: UserService,
              private tournamentService: TournamentService,
              private categoryService: CategoryService,
              private teamService: TeamService,
              public dialog: MatDialog,
              public router: Router) { }

  ngOnInit(): void {
    this.currentUserInToken = this.token.getUserInToken();
    this.userService.getUser(this.currentUserInToken.id)
      .subscribe(res=>{
        this.currentUser = res;
      });
    this.getUserTournaments();
    this.getMyTournaments();
    this.getAllCategories();
    this.getAllTeam();
  }

  private getAllCategories(){
    this.categoryService.getCategories({pageSize: 10, pageNumber: 0}).subscribe(
      res => {
        this.categoriesArr = res.items;
      }
    )
  }

  public getUserTournaments() {
    this.params = null;
    this.params = {
      pageNumber: this.pageIndex,
      pageSize: this.pageSize,
      userId: this.currentUserInToken.id
    }
    this.userService.getUserTournaments(this.params).subscribe(res => {
      this.tournaments = res.items;
      this.length = res.total;
    });
  }

  public getMyTournaments() {
    this.params = null;
    this.params = {
      pageNumber: this.pageIndex,
      pageSize: this.pageSize,
      userId: this.currentUserInToken.id
    }
    this.userService.getMyTournaments(this.params).subscribe(res => {
      this.myTournaments = res.items;
      this.length1 = res.total;
    });
  }

  showEditUserFrom() {
    this.showEditUser = true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TournamentFormDialogComponent, {
      data: {
        title: 'Create tournament',
        action: 'Create'
      },
      minWidth: '700px',
      panelClass: 'custom'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getMyTournaments();
      this.getUserTournaments();
    });
  }

  openEditDialog(tournament: any): void {
    const dialogRef = this.dialog.open(TournamentFormDialogComponent, {
      data: {
        title: 'Edit tournament',
        action: 'save',
        tournament: tournament
      },
      minWidth: '700px',
      panelClass: 'custom'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getMyTournaments();
      this.getUserTournaments();
    });
  }
  @Input() team?: Team;
  openTeamDialog(team: any = null): void {
    let action = 'Create';
    let title = 'Create team';
    if (team != null) {
      action = 'Edit'
      title = 'Edit team'
    }
    const dialogRef = this.dialog.open(TeamFormDialogComponent, {
      data: {
        title: title,
        action: action,
        team: team
      },
      minWidth: '700px',
      panelClass: 'custom'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getMyTournaments();
      this.getUserTournaments();
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getUserTournaments();
  }

  handlePageEvent1(e: PageEvent) {
    this.pageEvent1 = e;
    this.length1 = e.length;
    this.pageSize1 = e.pageSize;
    this.pageIndex1 = e.pageIndex;
    this.getMyTournaments();
  }

  goToTournament(tournamentId: any) {
    this.router.navigate([`/tournaments/${tournamentId}`]);
  }

  deleteTournament(id: any) {
    this.tournamentService.deleteTournament(id).subscribe(res => {
      if (res) {
        this.getMyTournaments();
        this.getUserTournaments();
      }
    })
  }

  getAllTeam() {
    this.params = null;
    this.params = {
      pageNumber: this.pageIndex2,
      pageSize: this.pageSize2,
      adminId: this.currentUserInToken.id
    }
    this.teamService.getTeams(this.params).subscribe(res => {
      this.myTeams = res.items;
      this.length2 = res.total;
    });
  }

  deleteTeam(id: any) {
    this.teamService.deleteTeam(id).subscribe(res => {
      if (res) {
        this.getAllTeam();
      }
    });
  }
}
