import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'suggestions', pathMatch: 'full' },

  {
    path: 'suggestions',
    loadChildren: () => import('./suggestions/suggestions.module').then(mod => mod.SuggestionsPageModule),
  },

  {
    path: 'shared/book-detail/:bookId',
    loadChildren: () => import('./shared/book-detail/book-detail.module').then(mod => mod.BookDetailPageModule),
  }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
