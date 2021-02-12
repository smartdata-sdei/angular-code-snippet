import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/service/content.service';


@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  content: any;
  pageid: string='4';

  constructor(private spinner:NgxSpinnerService, private contentService:ContentService) { }

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
