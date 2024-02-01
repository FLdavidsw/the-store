import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';// preload only the urls that appear in the screen

import { NotFoundComponent } from './not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';

import { AdminGuard } from './guards/admin.guard';

/*
-PreloadAllModules: It is used to preload the modules once the page that we are on has charged totally
This option has to be used uniquely if we just have a few modules, otherwise, charging all the modules 
once the main page has been charged will saturate the main thread by loading them.

-On the other hand, exists another way to preload specific modules instead of all them, which is applied 
in the service -CustomPreloadService-, Check out to see more details about it.
*/

/*
If we want our main URL without a specific endpoint to show the home page, 
we can either leave void the field path to assign the component that we want, or
redirect the empty path to the path that we want 
//redirect example:
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

*/
const routes: Routes = [
  /*
    It is necessary to separate those nested views when we have different modules,
    to not have a specific component in our whole application. To do that, 
    we need to use the children characteristic, to cluster all of the components that 
    a module needs to work. For instance:
  */
  
  //Next, we have an example about how to add a new module in the main module.
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data: {
      preload: true,
    }//we added this "flag" or "label" to apply our preload custom strategy created in the
     //service "CustomPreloadService"
  },
  {
    path: 'cms',
    canActivate: [AdminGuard],
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  /*
  Here, we declare our method to preload our modules. It is possible to use either 
  a custom method in which our main objective is not to load all of them 
  simultaneously but just the ones that we need or the angular method called 
  PreloadAllModules.
  */
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
