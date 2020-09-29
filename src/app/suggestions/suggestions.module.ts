import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestionsPage } from './suggestions.page';
import { SuggestionsRoutingModule } from './suggestions-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuggestionsRoutingModule,
  ],
  declarations: [SuggestionsPage]
})
export class SuggestionsPageModule {}
