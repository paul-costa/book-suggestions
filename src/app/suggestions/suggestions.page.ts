import { Component, OnInit } from '@angular/core';
import { SuggestionsService } from './suggestions.service';
import { Book } from '../shared/book.model';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.page.html',
  styleUrls: ['./suggestions.page.scss'],
})
export class SuggestionsPage implements OnInit {

  private completeShelf: Book[];

  constructor(private suggestionsService: SuggestionsService) { }

  ngOnInit() {
  }

}
