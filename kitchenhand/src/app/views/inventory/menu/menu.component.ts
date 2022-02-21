import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../services/inventory/inventory.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { OutletService } from '../../../services/outlet/outlet.service';
import { Outlet } from '../../../services/outlet/outlet.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public menu: Menu | undefined;
  public outlet: Outlet | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private outletService: OutletService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      filter((params: ParamMap) => params.has('outletId')),
      map((params: ParamMap) => params.get('outletId') || ''),
      switchMap(
        (outletId: string) => this.outletService.getOutlet(Number(outletId))
      )
    ).subscribe(
      (outlet: Outlet) => {
        this.outlet = outlet;
        this.menu = outlet.menu;
      }
    )
  }

  public navigateToUpdate(itemId: number): void {
    this.router.navigate([`inventory/outlet/${this.outlet?.id}/item/${itemId}/modify`]);
  }
}
