import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/service/content.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  //page id based on Pages Table #AboutUS
  pageid: string='1';
  content: any;

  constructor(private spinner: NgxSpinnerService, private contentService: ContentService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getContent();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  getContent(){
    this.contentService.getPageContent(this.pageid).subscribe(res => {
      if (res['status'] == 'success') {
        this.content = res['data']['page_content'];
        console.log(this.content);
      } else {
        this.content = null;
      }
    })
  }


}
