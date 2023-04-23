import {Component, OnInit} from '@angular/core';
import {SideItem} from "../../../core/model/side-item";

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit{

  sideItems: SideItem[] = [
    {
      id: 1,
      name: 'Tournaments',
      link: 'tournament',
      icon: 'art_track'
    },
    {
      id: 2,
      name: 'Categories',
      link: 'category',
      icon: 'category'
    },
    {
      id: 3,
      name: 'Users',
      link: 'users',
      icon: 'people'
    },
    {
      id: 4,
      name: 'Teams',
      link: 'teams',
      icon: 'people'
    }
  ];
  changeIcon: boolean = true;

  ngOnInit(): void {

  }
}
