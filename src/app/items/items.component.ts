import { Component, OnInit } from '@angular/core';
import {IItem} from './IItem';
import {ItemService} from './item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: IItem[] = [];
  createItem = false;
  item: IItem =  {
    id: null,
    name: null,
    price: null,
    imageUrl: null,
    stockUrgency: null,
    description: null,
    amountOfStock: null
  };
  // tslint:disable-next-line:variable-name
  private _filteredItems: IItem[] = [];
  filterText = '';
  private errorMessage = '';
  maxChars =  255;
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  private getItems() {
    this.itemService.getItems().subscribe({
        next: items => {
          this.items = items;
          this._filteredItems = items;
        },
        error: err => this.errorMessage = err
      });
  }

  get filteredItems(): IItem[] {
    this.filter();
    return this._filteredItems;
  }

  set filteredItems(value: IItem[]) {
    this._filteredItems = value;
  }

  filter(): void {
    this.filteredItems = this.items.filter(item => item.name.toLowerCase()
      .startsWith(this.filterText.toLowerCase()));
  }

  add(itemToAdd: IItem): void {
    // name = name.trim();
    // if (!name) { return; }
    this.itemService.addItem(itemToAdd)
      .subscribe(item => {
        this.items.push(item);
      });
    console.log(itemToAdd);
  }
  toggleCreate(): void{
    this.createItem = !this.createItem;
  }

  delete(item: IItem): void {
    this.items = this.items.filter(h => h !== item);
    this.itemService.deleteItem(item).subscribe();
  }
}
