import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-my-biography',
  templateUrl: './my-biography.component.html',
  styleUrls: ['./my-biography.component.css']
})
export class MyBiographyComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
 
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

}
