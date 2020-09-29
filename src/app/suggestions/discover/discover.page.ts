import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/book.model';
import { SuggestionsService } from '../suggestions.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  completeShelf: Book[] = [];
  randBookId: number;
  fetchingFinished = false;

  private everythingFetched = false;
  pageNo = 0;

  constructor(
    private suggestionsService: SuggestionsService,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getBooks().then(fetchedBooksArr => {
      fetchedBooksArr.forEach(fetchedBook => {
        this.completeShelf.push(fetchedBook);
        this.randBookId = Math.floor(Math.random() * (this.completeShelf.length));
        this.fetchingFinished = true;
      });
    });
  }


  loadData(event) {
    this.fetchFurtherBooks().finally(() => {
      event.target.complete();
    });
  }


  fetchFurtherBooks() {
    return this.getBooks().then(fetchedBooksArr => {
      if (fetchedBooksArr != null) {
        fetchedBooksArr.forEach(fetchedBook => {
          this.completeShelf.push(fetchedBook);
        });
      } else {
        this.showAlert('all books got fetched.');
        this.everythingFetched = true;
      }
    });
  }



  getBooks(): Promise<Book[]> {
    this.pageNo++;

    return new Promise((resolve, reject) => {
      this.suggestionsService.getShelf(this.pageNo).then(bookArr => {
        resolve(bookArr as Book[]);
      });
    });
  }


  showAlert(msg: string) {
    this.alertCtrl.create({
      header: 'You scrolled too far',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }



  onBookDetail(bookId: number) {
    this.router.navigateByUrl('/shared/book-detail/' + bookId);
  }
}
