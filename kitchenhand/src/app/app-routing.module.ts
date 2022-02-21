import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { InventoryComponent } from './views/inventory/inventory.component';
import { OrdersComponent } from './views/orders/orders.component';
import { MenuComponent } from './views/inventory/menu/menu.component';
import { MenuItemComponent } from './views/inventory/menu/menu-item/menu-item.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'inventory/outlet/:outletId', component: MenuComponent },
  { path: 'inventory/outlet/:outletId/item/:itemId/modify', component: MenuItemComponent },
  { path: 'orders', component: OrdersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
