import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../services/inventory/inventory.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { forkJoin, of, switchMap, tap } from 'rxjs';
import { InventoryInfo, Item, Stock, TimeSlot } from '../../../../services/inventory/inventory.model';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../../update/update.component';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  public item: Item | undefined;
  public itemStock: Stock | undefined;
  private outletId: number | undefined;

  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  getStartTime(timeslot: TimeSlot): string {
    return new Date(timeslot.startTime).toLocaleString();
  }

  getEndTime(timeslot: TimeSlot): string {
    return new Date(timeslot.endTime).toLocaleString();
  }

  openInventoryEditDialog(inventory: InventoryInfo, fulfillmentType: string): void {
    let updateDialog = this.dialog.open(UpdateComponent, {
      width: '350px',
      data: {
        inventory,
        outletId: this.outletId,
        itemId: this.item?.id,
        fulfillmentType
      }
    });
    updateDialog.afterClosed().subscribe(
      () => {
        this.initData();
      }
    )
  }

  public initData(): void {
    this.route.paramMap.pipe(
      tap((params: ParamMap) => this.outletId = Number(params.get('outletId'))),
      switchMap((params: ParamMap) => forkJoin([of(this.outletId || ''), of(params.get('itemId'))])),
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
    );
  }
}
