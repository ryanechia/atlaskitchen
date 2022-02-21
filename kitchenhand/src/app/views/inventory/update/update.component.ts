import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InventoryInfo } from '../../../services/inventory/inventory.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../../../services/inventory/inventory.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: [ './update.component.scss' ]
})
export class UpdateComponent implements OnInit {

  public editInventoryForm: FormGroup | undefined;
  public loadingSubmit = false;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { inventory: InventoryInfo, outletId: number, itemId: number, fulfillment: string }
  ) {
  }

  ngOnInit(): void {

    this.editInventoryForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      timeRange: [ '', Validators.required ],
      quantity: [ this.data.inventory.quantity, Validators.required ],
      blockedState: [ this.data.inventory.block, Validators.required ]
    });
  }

  onSubmit(): void {
    this.inventoryService.setStock(this.data.outletId, this.data.itemId, this.data.fulfillment).subscribe(
      () => {
        this.loadingSubmit = false;
        this.complete();
      }
    );
  }

  complete(): void {
    this.dialogRef.close();
  }
}