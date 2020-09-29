import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from './http.service';
import { xml2json } from 'xml-js';
import { AuthorArr, SimilarBook, BookDetail } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookDetailService {

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
  ) { }

  getBookById(id: number) {
    let apiReqUrl = this.httpService.proxy + 'https://www.goodreads.com/book/show.xml'
      + '?key=' + this.httpService.GOODREADS_API_KEY
      + '&id=' + id;

    const headers = new HttpHeaders();
    headers.append('Accept', 'application/xml');

    return new Promise((resolve, reject) => {
      this.http.get(apiReqUrl, {responseType: 'text'}).subscribe(response => {
        resolve(this.convertXMLtoJsonOnBook(response));
      },
      error => {
        reject(error);
      });
    });
  }



  convertXMLtoJsonOnBook(response: string) {
    const bookresult = JSON.parse(xml2json(response) as any).elements[0].elements[1].elements;

    let id: number;
    let title: string;
    let isbn: string;
    let imageUrl: string;
    let pubYear: number;
    let pubMonth: number;
    let pubDay: number;
    let publisher: string;
    let languageCode: string;
    let desc: string;
    let avgRating: number;
    let numPages: number;
    let url: string;
    const authors: AuthorArr[] = [];
    const similarBooks: string[] = [];
    const genres: string[] = []

    try { bookresult[0].elements[0].text ? id = +bookresult[0].elements[0].text : id = +bookresult[0].elements[0].cdata; } catch (e) { }
    try { bookresult[1].elements[0].text ? title = bookresult[1].elements[0].text : title = bookresult[1].elements[0].cdata; } catch (e) { }
    try { bookresult[2].elements[0].text ? isbn = bookresult[2].elements[0].text : isbn = bookresult[2].elements[0].cdata; } catch (e) { }
    try { bookresult[8].elements[0].text ? imageUrl = bookresult[8].elements[0].text : imageUrl = bookresult[8].elements[0].cdata; } catch (e) { }
    try { bookresult[10].elements[0].text ? pubYear = +bookresult[10].elements[0].text : pubYear = +bookresult[10].elements[0].cdata; } catch (e) { }
    try { bookresult[11].elements[0].text ? pubMonth = +bookresult[11].elements[0].text : pubMonth = +bookresult[11].elements[0].cdata; } catch (e) { }
    try { bookresult[12].elements[0].text ? pubDay = +bookresult[12].elements[0].text : pubDay = +bookresult[12].elements[0].cdata; } catch (e) { }
    try { bookresult[13].elements[0].text ? publisher = bookresult[13].elements[0].text : publisher = bookresult[13].elements[0].cdata; } catch (e) { }
    try { bookresult[14].elements[0].text ? languageCode = bookresult[14].elements[0].text : languageCode = bookresult[14].elements[0].cdata; } catch (e) { }
    try { bookresult[16].elements[0].text ? desc = bookresult[16].elements[0].text : desc = bookresult[16].elements[0].cdata; } catch (e) { }
    try { bookresult[18].elements[0].text ? avgRating = +bookresult[18].elements[0].text : avgRating = +bookresult[18].elements[0].cdata; } catch (e) { }
    try { bookresult[19].elements[0].text ? numPages = +bookresult[19].elements[0].text : numPages = +bookresult[19].elements[0].cdata; } catch (e) { }
    try { bookresult[24].elements[0].text ? url = bookresult[24].elements[0].text : url = bookresult[24].elements[0].cdata; } catch (e) { }

    try {
      const authorsArr = bookresult[26].elements;
      let thisAuthor;
      
      authorsArr.forEach(authorEl => {
        let authorId: number;
        let authorName: string;
        let authorImgUrl: string;
        let authorLink: string;
        let authorAvgRating: number;

        try { authorEl.elements[0].elements[0].text ? authorId = +authorEl.elements[0].elements[0].text : authorId = +authorEl.elements[0].elements[0].cdata} catch(e) { }
        try { authorEl.elements[1].elements[0].text ? authorName = authorEl.elements[1].elements[0].text : authorName = authorEl.elements[1].elements[0].cdata} catch(e) { }
        try { authorEl.elements[3].elements[0].text ? authorImgUrl = authorEl.elements[3].elements[0].text : authorImgUrl = authorEl.elements[3].elements[0].cdata} catch(e) { }
        try { authorEl.elements[5].elements[0].text ? authorLink = authorEl.elements[5].elements[0].text : authorLink = authorEl.elements[5].elements[0].cdata} catch(e) { }
        try { authorEl.elements[6].elements[0].text ? authorAvgRating = +authorEl.elements[6].elements[0].text : authorAvgRating = +authorEl.elements[6].elements[0].cdata} catch(e) { }

        try { thisAuthor = new AuthorArr(authorId, authorName, authorImgUrl, authorLink, authorAvgRating); } catch (eAuthor) { }

        authors.push(thisAuthor);
      });
    } catch (e) { console.log(e); }


    try {
      const similarBooksArr = bookresult[32].elements;
      let thisSimilarBook;
      
      similarBooksArr.forEach(authorEl => {
        let similarBookId: number;
        let similarBookTitle: string;
        let similarBookLink: string;
        let similarBookImageUrl: string;

        try { authorEl.elements[0].elements[0].text ? similarBookId = +authorEl.elements[0].elements[0].text : similarBookId = +authorEl.elements[0].elements[0].cdata} catch (e) { }
        try { authorEl.elements[1].elements[0].text ? similarBookTitle = authorEl.elements[1].elements[0].text : similarBookTitle = authorEl.elements[1].elements[0].cdata} catch (e) { }
        try { authorEl.elements[3].elements[0].text ? similarBookLink = authorEl.elements[3].elements[0].text : similarBookLink = authorEl.elements[3].elements[0].cdata} catch (e) { }
        try { authorEl.elements[5].elements[0].text ? similarBookImageUrl = authorEl.elements[5].elements[0].text : similarBookImageUrl = authorEl.elements[5].elements[0].cdata} catch (e) { }

        try { thisSimilarBook = new SimilarBook(similarBookId, similarBookTitle, similarBookLink, similarBookImageUrl); } catch (eSimilarBook) { }

        similarBooks.push(thisSimilarBook);
      });
    } catch (e) { console.log(e); }



    const genreExceptions = [
      'to-read', 'currently-reading', 'owned', 'default', 'favorites', 'books-i-own',
      'ebook', 'kindle', 'library', 'audiobook', 'owned-books', 'audiobooks', 'my-books',
      'ebooks', 'to-buy', 'english', 'calibre', 'books', 'british', 'audio', 'my-library',
      'favourites', 're-read', 'general', 'e-books', 'pdf'
    ];
    
    const genreArr = [];

    try {
      const shelfArr = bookresult[28].elements;

      for (const shelfArrItem of shelfArr) {
        if (genreExceptions.indexOf(shelfArrItem.attributes.name) === -1 && genreArr.length < 5) {
          genreArr.push(shelfArrItem.attributes.name);
        }
      }
    } catch (e) {
      console.log(e);
    }


    const bookDetail = new BookDetail(
      id, title, isbn, imageUrl, pubYear, pubMonth, pubDay, publisher,
      languageCode, desc, avgRating, numPages, url, authors, similarBooks,
      genreArr
    );

    return bookDetail;
  }


  excludeShelfNames(shelvesArr: string[]) {

  }
}
