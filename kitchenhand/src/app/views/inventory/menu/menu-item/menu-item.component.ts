import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../services/inventory/inventory.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { forkJoin, of, switchMap } from 'rxjs';
import { Item, Stock, TimeSlot } from '../../../../services/inventory/inventory.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  public item: Item | undefined;
  public itemStock: Stock | undefined;

  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => forkJoin([of(params.get('outletId') || ''), of(params.get('itemId'))])),
      switchMap(([outletId, itemId]) =>
        forkJoin([
          this.inventoryService.getStocks(Number(outletId), Number(itemId)),
          this.inventoryService.getItem(Number(outletId), Number(itemId))
        ])),
    ).subscribe(
      ([itemStock, item]) => {
        this.item = item;
        this.itemStock = itemStock;
      }
    )
  }

  getStartTime(timeslot: TimeSlot): string {
    return new Date(timeslot.startTime).toLocaleString();
  }

  getEndTime(timeslot: TimeSlot): string {
    return new Date(timeslot.endTime).toLocaleString();
  }
}
