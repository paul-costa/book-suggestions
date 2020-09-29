import { Injectable } from '@angular/core';
import { SavedBookDetail, BookDetail } from 'src/app/shared/book.model';
import { BookDetailService } from 'src/app/shared/book-detail.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SavedService {

  private _savedBooks: SavedBookDetail[] = [];
  private _savedGenres: string[] = [];

  constructor(
    private bookDetailService: BookDetailService,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    ) { }

  saveThisBookById(bookId: number) {
    this.bookDetailService.getBookById(bookId).then(book => {
      this._savedBooks.push({...book as BookDetail, expanded: false, transitionOnGoing: false});
      this._savedGenres = this.findGenres(this._savedBooks);

      this.alertCtrl.create({
        header: 'Book added!', 
        message: 'Your book was added and can be accessed through the Saved Book section.',
        buttons: [
          {
            text: 'Continue adding Books'
          },
          {
            text: 'Go to saved Books',
            handler: () => {
              this.router.navigate(['/suggestions/tabs/saved']);
            }
          },
        ]
      }).then(alertEl => {
        alertEl.present();
      });
    });
  }






  get SavedBooks() {
    return this._savedBooks;
  }

  get SavedGenres() {
    // ???
    // this._savedGenres.push('Genre1');

    return this._savedGenres;
  }




  findGenres(savedBooks: SavedBookDetail[]) {
    let savedGenres = [];

    for (const savedBook of savedBooks) {
      savedGenres = [...savedGenres, ...savedBook.genres];
    }

    return [...new Set(savedGenres)];
  }
}
