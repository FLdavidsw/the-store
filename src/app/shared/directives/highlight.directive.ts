import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  /* we can create a Directive using the next command 
  in our powershell or cmd: ng g d path/nameOurDirective
  A customized directive s us to manipulate page DOM, 
  but this isn't recommend by Angular, just in 
  some cases we can use them.
    */

  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = 'red';
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.style.backgroundColor = '';
  }
  constructor(
    private element: ElementRef
  ) { 
  //  this.element.nativeElement.style.backgroundColor = 'red';
  }

}
