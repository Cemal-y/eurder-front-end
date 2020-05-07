import {Component, Injectable, Input, OnInit} from '@angular/core';
import {CustomerService} from '../customers/customer.service';
import {NgForm} from '@angular/forms';
import {IAddress, ICustomer, IEmail, IPhoneNumber} from '../customers/ICustomer';
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class CreateCustomerComponent implements OnInit {
  createCustomer = true;
  // static createCustomer = false;
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
  public toggleCreate(): void {
    this.createCustomer = !this.createCustomer;
  }
  constructor(private customerService: CustomerService, private location: Location) { }

  ngOnInit(): void {
  }

  addCustomer(form: NgForm): void{
    if (form.valid) {
      this.customerService.addCustomer(this.customer).subscribe(customer => this.customer = customer);
      this.refreshPage();
    }
  }

  refreshPage(){
    window.location.reload();
  }

  toDetails(){
    this.location.go('/customers/', this.customer.id);
  }

}
