import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDetailService } from '../book-detail.service';
import { BookDetail } from '../book.model';
import { resolve } from 'url';
import { SavedService } from 'src/app/suggestions/saved/saved.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss'],
})
export class BookDetailPage implements OnInit {
  public bookDetail: BookDetail;
  public loadingFinished = false;

  public ionBadgeColor = ['primary', 'secondary', 'tertiary', 'success', 'danger'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookDetailService: BookDetailService,
    private router: Router,
    private savedService: SavedService,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('bookId')) {
        console.log('no book id ');
        return;
      } else {
        this.getBookDetail(+paramMap.get('bookId')).then(finalBookDetail => {
          this.bookDetail = finalBookDetail;
          this.loadingFinished = true;
        });
      }
    });
  }

  getBookDetail(bookId): Promise<BookDetail> {
    return new Promise((resolve, reject) => {
      this.bookDetailService.getBookById(bookId).then(bookDetailEl => {
        resolve(bookDetailEl as BookDetail);
      });
    });
  }

  getPubDate(): string {
    const year = this.bookDetail.pubYear + '';
    let month = this.bookDetail.pubMonth + '';
    let day = this.bookDetail.pubDay + '';

    if (year === 'undefined') { return ''; }
    if (month === 'undefined') { month = '1'; }
    if (day === 'undefined') { day = '1'; }

    if (+month < 10) { month = '0' + month; }
    if (+day < 10) { day = '0' + day; }

    return day + '.' + month + '.' + year;
  }

  getLanguage(languageCode: string) {
    switch (languageCode) {
      case 'eng':
        return 'English';
      
      case 'ger':
        return 'German';

      case 'jpn':
          return 'Japanese';
    
      default:
        return undefined;
    }
  }

  onBookDetail(bookId: number) {
    this.router.navigateByUrl('/shared/book-detail/' + bookId);
  }

  onSaveBook(bookId: number) {
    this.savedService.saveThisBookById(bookId);
  }
}
