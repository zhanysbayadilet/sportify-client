import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Category} from "../../../core/model/category";
import {UserService} from "../../../core/service/user.service";
import {CategoryService} from "../../../core/service/category.service";
import {TournamentService} from "../../../core/service/tournament.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LandingPageComponent implements OnInit{
  content?: string;
  categories: Category[] = [];
  countUsers?: number;
  countTournaments?: number;
  countPartners: number = 5;
  @ViewChild("myElement") MyProp?: ElementRef;
  private params: any;
  tournaments: any;

  constructor(private userService: UserService,
              private categoryService: CategoryService,
              private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getCountUsers();
    this.getCountTournaments();
    this.getTournaments();
  }

  private getAllCategories(){
    this.params = {
      pageSize: 10,
      pageNumber: 0,
    };
    this.categoryService.getCategories(this.params).subscribe(
      res => {
        this.categories = res.items;
      }
    );
  }

  private getCountUsers(){
    this.userService.getCountUsers().subscribe(res=>{
      this.countUsers = res;
    });
  }

  private getCountTournaments(){
    this.tournamentService.getCountTournaments().subscribe(res=>{
      this.countTournaments = res;
    })
  }

  public scrollOnClick() {
    this.MyProp?.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  private getTournaments(){
    this.tournamentService.getTournaments({pageNumber:0, pageSize:4}, {}).subscribe(res => {
      this.tournaments = res.items;
    })
  }
}
