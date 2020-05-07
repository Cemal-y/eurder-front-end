import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IAddress, ICustomer, IEmail, IPhoneNumber} from './ICustomer';
import {CustomerService} from './customer.service';
import {NgForm} from '@angular/forms';
import {CreateCustomerComponent} from '../create-customer/create-customer.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  @Output() customerEmitter = new EventEmitter<ICustomer>();
  customers: ICustomer[] = [];
  // tslint:disable-next-line:variable-name
  filteredCustomers: ICustomer[] = [];
  filtertext = '';
  errorMessage = '';
  createCustomer = false;
  email: IEmail = {
    complete: null, domain: ' ', localPart: ' '
  };
  address: IAddress = {
    country: null, houseNumber: null, postalCode: null, streetName: null
  };
  phoneNumber: IPhoneNumber = {
    countryCallingCode: null, number: null
  };
  customer: ICustomer = {
    id: null,
    address: this.address,
    email: this.email,
    firstname: null,
    lastname: null,
    phoneNumber: this.phoneNumber
  };
  create = false;
  constructor(private customerService: CustomerService, private createCustomerComponent: CreateCustomerComponent) { }

  sendCustomer(){
    this.customerEmitter.emit(this.customer);
  }
  ngOnInit(): void {
    this.getCustomers();
  }
  private getCustomers() {
    this.customerService.getCustomers().subscribe({
      next: customers => {
        this.customers = customers;
        this.filteredCustomers = customers;
      },
      error: err => this.errorMessage = err
    });
  }

  addCustomer(form: NgForm): void{
    if (form.valid) {
      this.customerService.addCustomer(this.customer).subscribe(customer => this.customers.push(customer));
      this.refreshPage();
    }
  }

  filter(): void{
    this.filteredCustomers = this.customers.filter(customer => customer.lastname.toLowerCase()
      .startsWith(this.filtertext.toLowerCase()));
  }
  toggleCreate(): void {
    this.create = !this.create;
  }
  refreshPage(){
    window.location.reload();
  }
}
