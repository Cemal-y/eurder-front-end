import {Component, Input, OnInit} from '@angular/core';
import {ICustomer} from '../customers/ICustomer';
import {CustomerService} from '../customers/customer.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  @Input() customer: ICustomer;

  constructor(private customerService: CustomerService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getCustomer();
  }

  private getCustomer() {
    const id = this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomerByID(id).subscribe(customer => this.customer = customer);
  }

}
