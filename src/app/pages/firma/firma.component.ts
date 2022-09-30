import { Component, OnInit } from '@angular/core';
import { LocalDataService } from 'src/app/service/localData.service';

@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.scss']
})
export class FirmaComponent implements OnInit {

  constructor(
    private localAuth: LocalDataService
  ) { }

  ngOnInit(): void {
    this.localAuth.isLocalAuthenticated();
  }

}
