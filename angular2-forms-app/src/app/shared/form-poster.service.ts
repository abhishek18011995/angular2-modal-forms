import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
// import 'rxjs/Rx';
// import { map, filter } from 'rxjs/operators';

@Injectable()
export class FormPosterService {

  constructor(private http: HttpClient) { }

  public postFormData(inputData) {
    const body = JSON.stringify(inputData);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://demo4232676.mockable.io/postEmployeeDetails', body, {
      headers: headers
    }).map(data => {
      console.log(typeof data);
      return data;
      // return data.json();
    })
      // .catch(error => this.handleError(error));
      .catch(this.handleError);
  }

  public handleError(error: HttpResponse<any>) {
    console.log('psot error :' + error.status);
    return Observable.throw(error);
  }
}
