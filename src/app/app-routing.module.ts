import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HydrationGuard } from './hydration.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@pages/shell/shell.module').then(m => m.ShellModule),
    canMatch: [HydrationGuard] // THIS IS PREVENTING FROM DOWNLOADING CHUNKS ON CLIENT
  },
  {
    path: '**',
    loadComponent: () => import('@pages/shell/shell-empty.component').then(m => m.ShellEmptyComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
