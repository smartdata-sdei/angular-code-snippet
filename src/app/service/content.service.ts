import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  public url:string = environment.backendUrl;
  constructor(private http:HttpClient) { }

  getPageContent(data){
    return this.http.get(this.url+'/api/customer/content/getPageContent/'+data);
  }

  getServiceList(){
    return this.http.get(this.url+'/api/customer/content/getServiceList');
  }

  getHomeAboutUs(){
    return this.http.get(this.url+'/api/customer/content/getHomeAboutUs');
  }

}
