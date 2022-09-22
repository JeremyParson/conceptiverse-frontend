import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css']
})
export class ResultCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() results: Results;
  displayFull: boolean = false;

  toggleDisplayFull () {
    this.displayFull = !this.displayFull;
  }
}
