import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { InventoryComponent } from './views/inventory/inventory.component';
import { OrdersComponent } from './views/orders/orders.component';
import { MenuComponent } from './views/inventory/menu/menu.component';
import { MenuItemComponent } from './views/inventory/menu/menu-item/menu-item.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: {title: 'Kitchen Manager'} },
  { path: 'inventory', component: InventoryComponent, data: {title: 'Outlets'} },
  { path: 'inventory/outlet/:outletId', component: MenuComponent, data: {title: 'Menu'} },
  { path: 'inventory/outlet/:outletId/item/:itemId/modify', component: MenuItemComponent, data: {title: 'Stock list'} },
  { path: 'orders', component: OrdersComponent, data: {title: 'Orders'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
