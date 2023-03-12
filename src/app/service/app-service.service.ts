import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) { }

  getCardData(): Observable<any>{
    return this.http.get('http://localhost:3000/list');
  }

  updateList(dataObject:any): Observable<any>{
    return this.http.post('http://localhost:3000/list', dataObject)
  }

  deleteList(id:any): Observable<any>{
    return this.http.delete('http://localhost:3000/list/' + id)
  }

  transferCard(data:any, id:any): Observable<any>{
    return this.http.put('http://localhost:3000/list/' + id, data)
  }
}
