import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private sharedService: SharedService,
    private router: Router,
    ) {}

  ngOnInit(): void {
  }

  OnCategories(category: string){
    this.sharedService.category.next(category);
    this.router.navigate(["/products"])
  }

}
