import { Route } from '@angular/router';
import {MainComponent} from "./modules/main/main.component";
import {AuthGuard} from "./core/auth/guards/auth.guard";

export const appRoutes: Route[] = [
  {path: '', pathMatch : 'full', redirectTo: 'main'},
  {
    path: '',
    // canActivate: [NoAuthGuard],
    // canActivateChild: [NoAuthGuard],
    component: MainComponent,
    // data: {
    //   layout: 'header'
    // },
    children: [
      // {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
      // {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
      // {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
      // {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
      // {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
    ]
  },
    {
    path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: MainComponent,
    // resolve: {
    //   initialData: InitialDataResolver,
    // },
    children: [
      // SPORT-TIME
      // Писать все модули страниц сюда
      {path: 'main', loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)},
      {path: 'tournaments', loadChildren: () => import('./modules/sportify/tournaments/tournaments.module').then(m => m.TournamentsModule)},
      {path: 'categories', loadChildren: () => import('./modules/sportify/categories/categories.module').then(m => m.CategoriesModule)},
      {path: 'profile', loadChildren: () => import('./modules/sportify/profile/profile.module').then(m => m.ProfileModule)},
      {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
    ]
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [NoAuthGuard],
    // component: LayoutComponent,
    // data: {
    //   layout: 'header'
    // },
    children: [
      {path: '', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)}
    ]
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [NoAuthGuard],
    // component: LayoutComponent,
    // data: {
    //   layout: 'header'
    // },
    children: [
      {path: '', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)}
    ]
  },
];
