import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {TournamentService} from "../../../../core/service/tournament.service";
import {CategoryService} from "../../../../core/service/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Tournament} from "../../../../core/model/tournament";
import {Category} from "../../../../core/model/category";

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css'],
  standalone: false,
})
export class TournamentListComponent implements OnInit{
  tournaments: Tournament[] = [];
  categories: Category[] = [];
  date = '';
  category = '';
  private params: any;
  pageNumber = 0;
  pageSize = 10;
  searchText: any;
  totalElements: any;
  disabled = false;
  pageEvent!: PageEvent;
  selectedCategories = new FormControl();
  selectedStatus = new FormControl();
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
              private route: ActivatedRoute,
              public router: Router) {
    this.route.queryParams.subscribe(params => {
      return this.category = params['category'];
    });
    if (this.category){
      this.selectedCategories.setValue([this.category])
    }
  }


  ngOnInit(): void {
    this.getAllTournaments();
    this.getAllCategories();
  }

  filter(filterBy: string, event?: any) {
    switch (filterBy) {
      case 'from_date':
        if(event.value == null){
          this.filterModel.filter.fromDate = null;
        }else
          this.filterModel.filter.fromDate = event.value.toISOString();
        break;
      case 'until_date':
        if(event.value == null) {
          this.filterModel.filter.untilDate = null;
        }else
          this.filterModel.filter.untilDate = event.value.toISOString();
        break;
    }
  }

  public getAllTournaments(){
    this.params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    };

    if (this.searchText == "") {
      this.filterModel.filter.searchText = null;
    } else if (this.searchText) {
      this.filterModel.filter.searchText = this.searchText;
    }

    if (this.selectedCategories.value?.length === 0) {
      this.filterModel.filter.categories = null;
    } else if (this.selectedCategories.value) {
      this.filterModel.filter.categories = this.selectedCategories.value;
    }

    this.tournamentService.getTournaments(this.params, this.filterModel.filter).subscribe(res => {
        this.tournaments = res.items;
        this.totalElements = res.total;
      }
    );
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }


  private getAllCategories(){
    this.categoryService.getCategories({pageSize: 10, pageNumber: 0}).subscribe(
      res => {
        this.categories = res.items;
      }
    )
  }

  goToTournament(tournamentId: any) {
    this.router.navigate([`/tournaments/${tournamentId}`]);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.totalElements = e.length;
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getAllTournaments();
  }
}
