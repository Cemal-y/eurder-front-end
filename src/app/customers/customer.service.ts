import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ICustomer} from './ICustomer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url = 'http://localhost:9000/customers/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<ICustomer[]>{
    return this.http.get<ICustomer[]>(this.url);
  }

  addCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(this.url, customer, this.httpOptions);
  }

  getCustomerByID(id: string): Observable<ICustomer> {
    return this.getCustomers().pipe(
      map(customers => customers.find(customer => customer.id === id))
    );
    // const detailsUrl = this.url.concat(id);
    // return this.http.get<ICustomer>(detailsUrl);
  }
}
