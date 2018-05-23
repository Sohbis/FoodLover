import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { ProcessHttpmsgService } from './process-httpmsg.service';


import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
// import { FEEDBACK } from '../shared/feedbacks';

@Injectable()
export class FeedBackService {

  constructor(private http: Http,
    private processHTTPMsgService: ProcessHttpmsgService) { }

 getFeedBack(feedback): Observable<Feedback[]> {
   return Observable.of(feedback).delay(2000);

  }

}
