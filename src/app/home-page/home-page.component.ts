import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
   tiles = [
    {url: '1.jpg', cols: 3, rows: 1 },
    {url: '2.jpg', cols: 1, rows: 2},
    {url: '3.jpg', cols: 1, rows: 1},
    {url: '4.jpg', cols: 2, rows: 1},
    {url: '5.jpg', cols: 1, rows: 2},
    {url: '6.jpg', cols: 2, rows: 1},
    {url: '7.jpg', cols: 1, rows: 1},
    {url: '8.jpg', cols: 2, rows: 1},
    {url: '9.jpg', cols: 1, rows: 1},
  ];
  constructor() { }

  ngOnInit() {
  }

}
