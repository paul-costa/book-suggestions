import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionsPage } from './suggestions.page';

import { DiscoverPageModule } from './discover/discover.module';
import { SavedPageModule } from './saved/saved.module';

const routes: Routes = [
  {
    path: 'tabs',
    component: SuggestionsPage,
    children: [
      {
        path: 'discover',
        loadChildren: () => DiscoverPageModule
      },
      {
        path: 'saved',
        loadChildren: () => SavedPageModule
      },

      {
        path: '',
        redirectTo: '/suggestions/tabs/discover',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/suggestions/tabs/discover',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule {}
