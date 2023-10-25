import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { saveAs } from 'file-saver';

import { environment } from 'src/environments/environment';

interface File {
  originalname: string;
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private urlApi = `${environment.API_URL}/api/files`;

  constructor( 
    private http: HttpClient
  ) { }
  
  /*
  To get a file exists a native html manner to do it, however, if you need to make it 
  with extra details and a certain logic, it is possible through code as shown down below
  */
  getFile(name: string, url: string, type: string) {
    return this.http.get(url, {responseType: 'blob'})
    .pipe(
      tap(content => {
        const blob = new Blob([content], {type});
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  uploadFile(file: Blob){
    const dto = new FormData();
    dto.append('file', file);
    return this.http.post<File>(`${this.urlApi}/upload`, dto, {
      /*
      Depending on the backend, headers could be necessary or unnecessary
      headers: {
        'Content-type': "multipart/form-data"
      }*/
    });
  }

}
