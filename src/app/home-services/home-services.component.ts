import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from '../service/content.service';

@Component({
  selector: 'app-home-services',
  templateUrl: './home-services.component.html',
  styleUrls: ['./home-services.component.css']
})
export class HomeServicesComponent implements OnInit {
  services: any=[];

  constructor(private spinner:NgxSpinnerService,private http:HttpClient,private contentService:ContentService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getServiceList();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  getServiceList(){
   this.contentService.getServiceList().subscribe(res => {
    if (res['status'] == 'success') {
      this.services = res['data'];
      console.log(this.services);
    } else {
      this.services = null;
    }
  })
  }
}
