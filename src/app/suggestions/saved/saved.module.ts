import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedPage } from './saved.page';
import { Routes, RouterModule } from '@angular/router';
import { GenreComponent } from 'src/app/shared/genre/genre.component';

const routes: Routes = [
  {
    path: '',
    component: SavedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SavedPage, GenreComponent],
  entryComponents: [GenreComponent],
})
export class SavedPageModule {}
