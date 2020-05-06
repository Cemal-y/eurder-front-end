import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {IItem} from './IItem';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsUrl = 'http://localhost:9000/items';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.itemsUrl).
      pipe(tap(_ => this.log('fetched items')),
      catchError(this.handleError<IItem[]>('getItems', [])));
  }
  addItem(item: IItem): Observable<IItem> {
    return this.http.post<IItem>(this.itemsUrl, item, this.httpOptions).pipe(
      tap((newItem: IItem) => this.log(`added Item id=${newItem.id}`)),
      catchError(this.handleError<IItem>('addItem'))
    );
  }
  getItemById(id: string): Observable<IItem>{
    return this.getItems().pipe(
      map(items => items.find(item => item.id === id))
    );
    // const url = this.itemsUrl.concat('/' + id);
    // return this.http.get<IItem>(url);
  }
  updateItem(item: IItem): Observable<IItem> {
    let updateUrl = this.itemsUrl;
    updateUrl += `/${item.id}`;
    return this.http.put(updateUrl, item, this.httpOptions).pipe(
      tap(_ => this.log(`updated item id=${item.id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }
  deleteItem(item: IItem | number): Observable<IItem> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.itemsUrl}/${id}`;

    return this.http.delete<IItem>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError<IItem>('deleteItem'))
    );
  }
  private log(message: string) {
    this.messageService.add(`ItemService: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
