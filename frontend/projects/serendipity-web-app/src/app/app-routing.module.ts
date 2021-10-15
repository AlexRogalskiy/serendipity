import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//
// Components - local
//

import { AuthorizationCodeCallbackComponent } from "@app/core/components/authorization-code-callback/authorization-code-callback.component";
import { HomeComponent } from '@app/core/components/home/home.component';
import { PlaceholderComponent } from '@app/core/components/placeholder/placeholder.component';

const routes: Routes = [

  {
    // path: 'authorization-code/callback',
    // path: 'login-callback',
    path: 'bff/login/success',
    component: AuthorizationCodeCallbackComponent,
    // canActivate: [AuthGuard],
    // runGuardsAndResolvers: 'always'
  },

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },

  {
    path: 'customers',
    children: [
      {
        path: '',
        loadChildren: () => import('../../../party-lib/src/lib/party-lib.module').then(m => m.PartyLibModule)
      }
    ]
  },

  {
    path: 'reports',
    component: PlaceholderComponent,
    // canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },

  {
    path: 'not-found',
    component: PlaceholderComponent,
    // canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },

  //
  // The Wildcard route
  // DO NOT insert routes after this one.
  // { path:'**', ...} needs to be the LAST one.
  //

  {
    path: '**',
    component: PlaceholderComponent
    // redirectTo: 'not-found'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

/*

  {
    path: 'customers',
    children: [
      {
        path: '',
        // loadChildren: () => import('../../../party/src/app/features/features.module').then(m => m.FeaturesModule)
        loadChildren: () => import('../../../party-lib/src/lib/party-lib.module').then(m => m.PartyLibModule)
        // loadChildren: () => import('./lazy-loading/party-lib-wrapper.module').then(m => m.PartyLibWrapperModule)
      }
    ]
  },

// import { loadRemoteModule } from '@angular-architects/module-federation';

  {
    path: 'customers',
    loadChildren: () =>
      loadRemoteModule({
        // remoteEntry: 'http://localhost:4201/remoteEntry.js',
        remoteName: 'party',
        exposedModule: './Module'
      }).then(m => m.FeaturesModule)
  },

// https://github.com/angular-architects/module-federation-plugin/blob/main/libs/mf/tutorial/tutorial.md

*/
