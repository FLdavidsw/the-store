import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img = '';

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
  }
  @Input() altv = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = "./assets/images/nodisponible.png";
  //counterSeg = 0;
  //counterMin = 0;
  //counterHour = 0;
  //counterFn: number | undefined;

  constructor (){
    // before - during render
    // NO async -- once time
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-unused-vars
  ngOnChanges(changes: SimpleChanges) {
    /* the inputs' changes are detect in this method and not in the ngOnInit
      before render
       changes inputs -- times
       SimpleChanges is a way to receive all changes happen while the
       page is running
      console.log('ngOnChanges', 'imgValue =>', this.img);
      console.log('changes',changes);
    */
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    /*
    console.log('ngOnInit', 'imgValue =>', this.img);
    - before render
    - async - fetch -- once time
    console.log('ngOnInit', 'imgValue =>', this.img);
   
    FORMA DE CREAR UN CONTADOR:
    
    this.counterFn =
      window.setInterval(() => {
       if(this.counterSeg >= 59){
          this.counterSeg = 0;
          this.counterMin += 1;
        }
        else
        {
          this.counterSeg += 1;
          console.log('run counter');
        }
        if(this.counterMin >= 60){
          this.counterMin = 0;
          this.counterHour += 1;
        }
      }, 1000);
      console.log(this.counterFn);
       */
    }
   

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngAfterViewInit() {
    // after render
    // handle children
    // console.log('ngAfterViewInit');
  }

  ngOnDestroy(){
    //delete
    console.log('ngOnDestroy');
    //window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    //console.log("log hijo");
    this.loaded.emit(this.img);
  }
}
