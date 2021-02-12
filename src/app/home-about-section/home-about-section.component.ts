import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from '../service/content.service';

@Component({
  selector: 'app-home-about-section',
  templateUrl: './home-about-section.component.html',
  styleUrls: ['./home-about-section.component.css']
})
export class HomeAboutSectionComponent implements OnInit {
  aboutus: any=[];

  constructor(private spinner: NgxSpinnerService,private contentService:ContentService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getHomeAboutUs();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }


  getHomeAboutUs(){
    this.contentService.getHomeAboutUs().subscribe(res => {
     if (res['status'] == 'success') {
       this.aboutus = res['data']['content'];
       console.log(this.aboutus);
     } else {
       this.aboutus = null;
     }
   })
   }
}
