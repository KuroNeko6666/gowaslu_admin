import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { AccountCreateInterfaces } from 'src/app/interfaces/account-create-interfaces';
import { AccountInterfaces } from 'src/app/interfaces/account-interfaces';
import { AccountModel } from 'src/app/models/account-model';
import { UserCreateComponent } from '../user-create/user-create.component';

const ICON_DATA = {
  faUser: faUser,
  faMail: faEnvelope,
  faPassword: faLock
}

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {

  icon = ICON_DATA


  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<UserCreateComponent>,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: AccountModel,
  ){}

  form = this.fb.group({
    name : ['', [Validators.required]],
    email : ['', [Validators.required]],
    password : ['', [Validators.required]],
  })

  role = 1

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.name?.setValue(this.data.name)
    this.email?.setValue(this.data.email)
    if(this.data.role == 'user'){
      this.role = 1
    }
    if(this.data.role == 'operator'){
      this.role = 2
    }
    if(this.data.role == 'admin'){
      this.role = 3
    }
  }

  get name(){
    return this.form.get('name')
  }

  get email(){
    return this.form.get('email')
  }


  submit(){
    if(this.name?.valid && this.email?.valid){
      let data: AccountInterfaces = {
        name: this.name.value!,
        email: this.email.value!,
        role: this.role,
      }
      this.ref.close(data)
    } else {
      this.snackbar.open('terjadi kesalahan', 'oke', {duration:3000})
    }
  }

  close(){
    this.ref.close()
  }

}
