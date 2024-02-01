import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { VowelToNumberPipe } from './pipes/vowel-to-number.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';

/*A shared module is used to save modules that might be necessary for other modules
and not just for a specific one */

@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    VowelToNumberPipe,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbCarouselModule
  ],
  //Exports: modules and components that we want to share with other modules
  exports: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    VowelToNumberPipe,
    HighlightDirective
  ]
})
export class SharedModule { }
