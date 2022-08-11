import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  options = [
    { value: 1, name: '1' },
    { value: 2, name: '2' },
    { value: 3, name: '3' },
  ];

  selectedOption;

  constructor() {
    this.selectedOption = this.options[1];
  }

  ngOnInit(): void {
  }

}
