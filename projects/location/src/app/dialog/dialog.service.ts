import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpEvent, HttpEventType,
HttpErrorResponse, HttpResponse, HttpHeaders, HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  URL = 'http://localhost:4200/';

  constructor( private http: HttpClient ) { }

  HttpEventResponse(event) {
    switch (event.type) {
      case HttpEventType.Sent:
        break;
      case HttpEventType.ResponseHeader:
        break;
      case HttpEventType.DownloadProgress:
        const loaded = Math.round(event.loaded / 1024);
        break;
      case HttpEventType.Response:
        return event.body;
    }
  }

  _usaStates(): Observable<any> {
    const request = new HttpRequest<any>('GET', this.URL + 'assets/jsons/usstates.json', { reportProgress: true });
    return this.http.request(request);
  }

  _timezones(): Observable<any> {
    const request = new HttpRequest<any>('GET', this.URL + 'assets/jsons/timezones.json', { reportProgress: true });
    return this.http.request(request);
  }


  // _middleware(){
  //   this._assetsData().subscribe((event: HttpEvent<any>) => {
  //     let response = this.HttpEventResponse(event);
  //     if ( response) {
  //       console.log(response);
  //     }
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

}
