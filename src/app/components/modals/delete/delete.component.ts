import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  constructor(private ref: MatDialogRef<DeleteComponent>){}

  submit(){
    this.ref.close(true)
  }
  close(){
    this.ref.close()
  }

}
