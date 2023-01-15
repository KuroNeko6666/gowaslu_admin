import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { AccountCreateInterfaces } from 'src/app/interfaces/account-create-interfaces';

const ICON_DATA = {
  faUser: faUser,
  faMail: faEnvelope,
  faPassword: faLock
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {

  icon = ICON_DATA

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<UserCreateComponent>,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: number,

  ){}

  form = this.fb.group({
    name : ['', [Validators.required]],
    email : ['', [Validators.required]],
    password : ['', [Validators.required]],
  })

  get name(){
    return this.form.get('name')
  }

  get email(){
    return this.form.get('email')
  }

  get password(){
    return this.form.get('password')
  }

  submit(){
    if(this.name?.valid && this.password?.valid && this.email?.valid){
      let data: AccountCreateInterfaces = {
        name: this.name.value!,
        email: this.email.value!,
        password: this.password.value!,
        role: this.data,
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
