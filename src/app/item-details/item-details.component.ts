import {Component, Input, OnInit} from '@angular/core';
import {ItemService} from '../items/item.service';
import {IItem} from '../items/IItem';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  @Input() item: IItem;
  updateMode = false;
  constructor(private route: ActivatedRoute,
              private itemService: ItemService,
              private location: Location) {
  }
  ngOnInit(): void {
    this.getItem();
  }
  getItem(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.itemService.getItemById(id).subscribe(item => this.item = item);
  }
  update(): void {
    this.itemService.updateItem(this.item)
      .subscribe(() => this.refreshPage());

  }
  goBack() {
    this.location.back();
  }
  refreshPage(){
    window.location.reload();
  }
  toggleUpdateMode(){
    this.updateMode = !this.updateMode;
  }
}

