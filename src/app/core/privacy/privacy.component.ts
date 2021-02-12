import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/service/content.service';


@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {
  content: any;
  pageid: string = '2';

  constructor(private spinner: NgxSpinnerService, private contentService:ContentService) { }

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
