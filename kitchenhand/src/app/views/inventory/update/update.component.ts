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
    @Inject(MAT_DIALOG_DATA) public data: { inventory: InventoryInfo, outletId: number, itemId: number, fulfillment: string }
  ) {
  }

  ngOnInit(): void {

    this.editInventoryForm = this.fb.group({
      startDate: [ '', Validators.required ],
      endDate: [ '', Validators.required ],
      startTime: [ '', Validators.required ],
      endTime: [ '', Validators.required ],
      quantity: [ this.data.inventory.quantity, Validators.required ],
      blockedState: [ this.data.inventory.block ]
    });
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
      this.inventoryService.setStock(this.data.outletId, this.data.itemId, this.data.fulfillment, this.editInventoryForm.value.blockedState,
        newTimeslot, this.editInventoryForm.value.quantity).subscribe(
        () => {
          this.loadingSubmit = false;
          this.complete();
        }
      );
    }
  }

  complete(): void {
    this.dialogRef.close();
  }
}
