import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookDetailPage } from './book-detail.page';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: BookDetailPage, }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BookDetailPage]
})
export class BookDetailPageModule {}
