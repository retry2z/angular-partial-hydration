import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell-full.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('@components/cookie-modal/cookie-modal.component').then(m => m.CookieModalComponent),
        outlet: 'cookie-modal-component',
      },


      // ==========================
      // PAGES
      // ==========================
      {
        path: 'page-1',
        loadComponent: () => import('@pages/page-1/page-1.component').then(m => m.PageOneComponent),
      },
      {
        path: 'page-2',
        loadComponent: () => import('@pages/page-2/page-2.component').then(m => m.PageTwoComponent),
      },
      {
        path: '',
        loadComponent: () => import('@pages/page-1/page-1.component').then(m => m.PageOneComponent),
      },
    ]
  }
];

@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CommonModule,
    RouterModule
  ],
  providers: []
})
export class ShellModule { }

