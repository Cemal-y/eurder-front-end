import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ItemsComponent} from './items/items.component';
import {ItemDetailsComponent} from './item-details/item-details.component';
import {CustomersComponent} from './customers/customers.component';
import {CustomerDetailsComponent} from './customer-details/customer-details.component';
import {CreateCustomerComponent} from './create-customer/create-customer.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: '**', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'items', component: ItemsComponent},
  {path: 'items/:id', component: ItemDetailsComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'customers/create', component: CreateCustomerComponent},
  {path: 'customers/:id', component: CustomerDetailsComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
