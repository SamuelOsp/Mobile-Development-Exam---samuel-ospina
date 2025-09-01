import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth-guard';
import { isLoggedGuard } from './guard/is-logged-guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomePage } from './pages/home/home.page';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [isLoggedGuard],
  },

  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
    canActivate: [isLoggedGuard],
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },

  {
    path: 'detail/:uuid',
    loadChildren: () =>
      import('./pages/detail/detail.module').then((m) => m.DetailPageModule),
    canActivate: [authGuard],
  },

  {
    path: 'home',
    component: MainLayoutComponent,
    children: [{ path: 'home', component: HomePage }],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
