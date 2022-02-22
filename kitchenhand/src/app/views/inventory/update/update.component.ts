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
  public startTime: { hour: number; minute: number; } | undefined;
  public endTime: { hour: number; minute: number; } | undefined;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { inventory?: InventoryInfo, outletId: number, itemId: number, fulfillment: string }
  ) {
  }

  ngOnInit(): void {
    const defaultStartDate = this.data.inventory ? new Date(this.data.inventory.timeslot.startTime) : new Date();
    const defaultEndDate = this.data.inventory ? new Date(this.data.inventory.timeslot.endTime) : new Date();

    this.startTime = this.data.inventory ? {
      hour: defaultStartDate.getHours(),
      minute: defaultStartDate.getMinutes(),
    } : undefined;

    this.endTime = this.data.inventory ? {
      hour: defaultEndDate.getHours(),
      minute: defaultEndDate.getMinutes(),
    } : undefined;

    this.editInventoryForm = this.fb.group({
      startDate: [ defaultStartDate || '', Validators.required ],
      endDate: [ defaultEndDate || '', Validators.required ],
      startTime: [ this.startTime || '', Validators.required ],
      endTime: [ this.endTime || '', Validators.required ],
      quantity: [ this.data.inventory?.quantity || null ],
      blockedState: [ this.data.inventory?.block || false ]
    });

    const quantityControl = this.editInventoryForm.get('quantity');
    this.editInventoryForm.get('blockedState')?.valueChanges.subscribe(
      (isBlocked: boolean) => {
        if (isBlocked) {
          quantityControl?.disable();
        } else {
          quantityControl?.enable();
        }
        quantityControl?.updateValueAndValidity();
      }
    );
  }

  onSubmit(): void {
    if (this.editInventoryForm?.valid) {
      this.loadingSubmit = true;

      // combine date and time to ISO format
      let startDate = new Date(this.editInventoryForm.value.startDate);
      startDate.setHours(this.editInventoryForm.value.startTime.hour, this.editInventoryForm.value.startTime.minute);

      let endDate = new Date(this.editInventoryForm.value.endDate);
      endDate.setHours(this.editInventoryForm.value.endTime.hour, this.editInventoryForm.value.endTime.minute);

      const newTimeslot = {
        startTime: startDate,
        endTime: endDate
      };
      if (this.data.inventory) {
        this.inventoryService.setStock(this.data.outletId, this.data.itemId, this.data.fulfillment, this.editInventoryForm.value.blockedState,
          newTimeslot, this.editInventoryForm.value.quantity).subscribe(
          () => {
            this.loadingSubmit = false;
            this.complete();
          }
        );
      }
    }
  }

  complete(): void {
    this.dialogRef.close();
  }
}
