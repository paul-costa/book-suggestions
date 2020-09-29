import { Component, OnInit } from '@angular/core';
import { Book, BookDetail, SavedBookDetail } from 'src/app/shared/book.model';
import { SavedService } from './saved.service';
import { ModalController } from '@ionic/angular';
import { GenreComponent } from 'src/app/shared/genre/genre.component';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {
  savedBooks: SavedBookDetail[] = [];
  showAllBooks = true;

  savedGenres: string[] = [];

  constructor(
    private savedService: SavedService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.savedBooks = [...this.savedService.SavedBooks];
    this.savedGenres = this.savedService.SavedGenres;
  }


  onShowBookDetail(id: number) {
    const selectedBook = this.savedBooks.find(element => element.id === id);

    selectedBook.transitionOnGoing = true;
    selectedBook.expanded = !selectedBook.expanded;


    setTimeout(() => {
      selectedBook.transitionOnGoing = false;
    }, 1000);

  }

  onChangeView() {
    this.showAllBooks = !this.showAllBooks;
  }



  openGenre(genre: string) {
    this.modalCtrl.create({component: GenreComponent, componentProps: {selectedGenre: genre}})
    .then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    });
  }
}
