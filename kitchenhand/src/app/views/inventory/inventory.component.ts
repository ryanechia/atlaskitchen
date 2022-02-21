import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory/inventory.service';
import { Observable } from 'rxjs';
import { OutletService } from '../../services/outlet/outlet.service';
import { Router } from '@angular/router';
import { Outlet } from '../../services/outlet/outlet.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: [ './inventory.component.scss' ]
})
export class InventoryComponent implements OnInit {

  public outlets$: Observable<Outlet[]> | undefined;

  constructor(
    private inventoryService: InventoryService,
    private outletService: OutletService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.outlets$ = this.outletService.getOutlets();

      // todo: can enhance to show stock health information within the outlet's card.
      // .pipe(
      // mergeMap((outlets) => from(outlets).pipe(
      //     mergeMap((outlet) => this.inventoryService.getStocks(outlet, )
      //     ),
      //   toArray()
      //   )
      // )
    // );
  }

  public outletClickedHandler(outlet: Outlet) {
    this.router.navigate([`/inventory/outlet/${outlet.id}`]);
  }

}
