import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private _GOODREADS_API_KEY = 'Jt7RNDHTVDyzWdnbhjVVeA';
  private _GOODREADS_API_SECRET = 'j9n4xOw9MqIlvpkJ89S3c8elhT1vmQ3IqySPZs9WT3o';

  private _proxy = 'https://cors-anywhere.herokuapp.com/'
  private _userId = '77910987-paul-costa';


  constructor() { }

  get GOODREADS_API_KEY() {
    return this._GOODREADS_API_KEY;
  }
  get GOODREADS_API_SECRET() {
    return this._GOODREADS_API_SECRET;
  }

  get proxy() {
    return this._proxy;
  }
  get userId() {
    return this._userId;
  }
}
