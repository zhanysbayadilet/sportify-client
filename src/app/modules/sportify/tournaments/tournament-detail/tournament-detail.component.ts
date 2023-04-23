import {Component, OnInit} from '@angular/core';
import {Tournament} from "../../../../core/model/tournament";
import {Category} from "../../../../core/model/category";
import {User} from "../../../../core/model/user";
import {MatSnackBar, MatSnackBarHorizontalPosition} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {PageEvent} from "@angular/material/paginator";
import {City} from "../../../../core/model/city";
import {TournamentService} from "../../../../core/service/tournament.service";
import {ActivatedRoute} from "@angular/router";
import {TokenStorageService} from "../../../../core/service/token-storage.service";

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit{
  tournamentId: any;
  currentUser: any;
  tournament?: Tournament = new Tournament();
  category?: Category = new Category();
  organizer?: User = new User();
  city?: City = new City();
  viewSubscribeButton: boolean = false;
  displayedColumns: string[] = ['index', 'id', 'username', 'email'];
  dataSource = new MatTableDataSource();
  searchText: any;
  selectedStatus: any;
  params: any;
  length = 10;
  pageSize = 10;
  pageIndex = 0;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent?: PageEvent;
  users: any;

  constructor(private tournamentService: TournamentService,
              public route: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private snackBar: MatSnackBar) {
    this.tournamentId = this.route.snapshot.paramMap.get('tournamentId');
    this.currentUser = this.tokenStorageService.getUserInToken();
  }

  ngOnInit(): void {
    this.getTournament()
    this.checkStatusSubscribe();
    this.getAllParticipants();
  }

  getTournament(){
    return this.tournamentService.getTournament(this.tournamentId).subscribe(
      res => {
        console.log('res', res);
        if (res){
          this.tournament = res;
          this.category = this.tournament.category;
          this.organizer = this.tournament.organizer;
          this.city = this.tournament.city;
        }
      }
    );
  }

  subscribeToTournament() {
    if (this.category?.type === 'SINGLE') {
      this.tournamentService.subscribeToTournament(this.tournamentId, this.currentUser.id).subscribe(
        res => {
          this.tournament = res;
          if (res) {
            this.checkStatusSubscribe();
            this.openSnackBar('You have successfully subscribed!', 'OК');
          }
          this.getAllParticipants();
        }
      );
    } else {

    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['white']
    });
  }

  checkStatusSubscribe(){
    this.tournamentService.getStatusSubscribe(this.currentUser.id, this.tournamentId).subscribe(res =>{
      this.viewSubscribeButton = res == null;
    })
  }

  unSubscribeToTournament() {
    this.tournamentService.unsubscribeToTournament(this.currentUser.id, this.tournamentId).subscribe(res =>{
      this.checkStatusSubscribe();
      if (res == 1) {
        this.openSnackBar('You have successfully unsubscribed!', 'OК');
      } else {
        this.openSnackBar('You have successfully subscribed!', 'OК');
      }
      this.getAllParticipants();
    });
  }

  get() {

  }

  getAllParticipants() {
    this.params = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex,
      tournamentId: this.tournamentId
    };
    this.tournamentService.getTournamentParticipants(this.params).subscribe(res => {
      this.dataSource = new MatTableDataSource(res.items);
      this.users = res.items;
      this.length = res.total;
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
}
