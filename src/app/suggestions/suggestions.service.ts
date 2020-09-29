import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { xml2json } from 'xml-js';
import { Book } from '../shared/book.model';
import { HttpService } from '../shared/http.service';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {
  private noOfPages = 0;
  private requestsMade = 0;


  constructor(
    private http: HttpClient,
    private httpService: HttpService,
  ) { }


  getShelf(page: number) {
    let apiReqUrl = this.httpService.proxy + 'https://www.goodreads.com/review/list?v=2';

    apiReqUrl += '&id=' + this.httpService.userId
     + '&page=' + page
     + '&per_page=5'
     + '&key=' + this.httpService.GOODREADS_API_KEY;

    const headers = new HttpHeaders();
    headers.append('Accept', 'application/xml');

    return new Promise((resolve, reject) => {
      this.http.get(apiReqUrl, {responseType: 'text'}).subscribe(response => {
        // fetch number of pages
        if (page === 1) {
          this.getNoOfPages(response);
          resolve(this.convertShelfToBookArr(response));
        }

        if (page <= this.noOfPages) {
          resolve(this.convertShelfToBookArr(response));
        }

        if (page > this.noOfPages) {
          resolve(null);
        }
      },
      error => {
        reject(error);
      });
    });
  }



  convertShelfToBookArr(response: string) {
    const bookArr: Book[] = [];
    const booksObjArr: Array<any> = JSON.parse(xml2json(response) as any).elements[0].elements[1].elements;

    booksObjArr.forEach(book => {
      let id;
      let isbn;
      let title;
      let imageUrl;
      let link;
      let averageRating;
      let description;
      let author;

      try { id = +book.elements[1].elements[0].elements[0].text; } catch (e) { id = null; }
      try { isbn = +book.elements[1].elements[1].elements[0].text; } catch (e) { isbn = null; }
      try { title = book.elements[1].elements[5].elements[0].text; } catch (e) { title = null; }
      try { imageUrl = book.elements[1].elements[7].elements[0].text; } catch (e) { imageUrl = null; }
      try { link = book.elements[1].elements[10].elements[0].text; } catch (e) { link = null; }
      try { averageRating = +book.elements[1].elements[18].elements[0].text; } catch (e) { averageRating = null; }
      try { description = book.elements[1].elements[20].elements[0].text; } catch (e) { description = null; }
      try { author = book.elements[1].elements[21].elements[0].elements[1].elements[0].text; } catch (e) { author = null; }

      bookArr.push(new Book(id, isbn, title, imageUrl, link, averageRating, description, author));
    });
    return bookArr;
  }

  getNoOfPages(response: string) {
    this.noOfPages = Math.ceil(
      (JSON.parse(xml2json(response) as any).elements[0].elements[1].attributes.total) / 5
    );
  }

  getRandomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }


}
