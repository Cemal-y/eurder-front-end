import {Component, Input, OnInit} from '@angular/core';
import {ICustomer} from '../customers/ICustomer';
import {CustomerService} from '../customers/customer.service';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  @Input() customer: ICustomer;
  updateMode = false;

  constructor(private customerService: CustomerService, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    const id = this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomerByID(id).subscribe(customer => this.customer = customer);
  }

  updateCustomer() {
    this.customerService.updateCustomer(this.customer).subscribe(() => this.refreshPage());
  }

  toggleUpdateMode() {
    this.updateMode = !this.updateMode;
  }

  goBack() {
    this.location.back();
  }
  refreshPage(){
    window.location.reload();
  }
}
