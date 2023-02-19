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
      // {
      //   path: '**',
      //   loadChildren: () => import('@pages/page-builder/page.module').then(m => m.PageModule),
      // },
      // {
      //   path: '',
      //   loadChildren: () => import('@pages/page-builder/page.module').then(m => m.PageModule),
      // },
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

