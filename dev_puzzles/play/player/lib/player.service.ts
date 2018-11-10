import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

// In  Angular 6 / Rxjs 6 the import is like below
// import { Observable, of } from 'rxjs';

// but in Angular 5.2.x and Rxjs 5x is:
import { Observable } from 'rxjs';
import { of } from 'rxjs';

// interface IConstructor<T> {
//   new(...args: any[]): T;
//   factory(obj: any): T;
// }

// import {GlobalEmittersArrayService} from '@colabo-puzzles/f-core/code/puzzles/globalEmitterServicesArray';
// import { RimaAAAService } from '@colabo-rima/f-aaa/rima-aaa.service';

// import { environment } from '../../environments/environment';

//this consts are defined by INSTALL.MD data:
// const MAP_ID = "5b8a5260f8b8e40f3f250f9d"; //TEF
//const MAP_ID = "5b49e7f736390f03580ac9a7"; //Forum Vlasina

import * as config from '@colabo-utils/i-config';

@Injectable()
export class PlayerService {

  sounds:any = {};//Observer

  constructor(){
    this.init();
  }

  init():void{
    console.log('PlayerService.init');
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      window.alert('error: ' + error);

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getSounds(searchQuery: string, callback: Function= null): Observable<any[]>{
    console.log('[getSounds] searchQuery: %s', searchQuery);
    return this.loadSounds(searchQuery, callback);
  }

  loadSounds(searchQuery: string, callback: Function= null): Observable<any[]> {
    const result: Observable<any[]> = of([]);
    return result;
    // return of(this.soundsMockup);
       //.subscribe(nodes => this.sdgsReceived(nodes)); //as KNode}
  }
}

