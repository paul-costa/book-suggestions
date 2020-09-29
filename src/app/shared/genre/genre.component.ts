import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SavedService } from 'src/app/suggestions/saved/saved.service';
import { SavedBookDetail } from '../book.model';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {

  @Input()
  selectedGenre: string;

  booksInGenre: SavedBookDetail[] = [];

  showOwnGenres = true;

  constructor(
    private modalCtrl: ModalController,
    private savedService: SavedService
  ) { }

  ngOnInit() {}


  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onChangeView() {
    this.showOwnGenres = !this.showOwnGenres;
  }

  ionViewWillEnter() {
    this.booksInGenre =
      this.savedService.SavedBooks.filter(savedBook =>
        savedBook.genres.includes(this.selectedGenre)
      );
  }
}
