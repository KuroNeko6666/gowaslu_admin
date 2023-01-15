import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faEmber } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLock, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api/api.service';
import { LoginInterfaces } from 'src/app/interfaces/login-interfaces';
import { ResponseInterfaces } from 'src/app/interfaces/response-interfaces';
import { LoginResponseInterfaces } from "src/app/interfaces/login-response-interfaces";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

const ICON_DATA = {
  faMail: faEnvelope,
  faPassword: faLock
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  icon = ICON_DATA

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snackbar: MatSnackBar,
    private router: Router
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.api.checkLogin()){
      this.router.navigateByUrl('home/dashboard')
    }
  }

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })

  get email(){
    return this.form.get('email')
  }

  get password(){
    return this.form.get('password')
  }

  submit(){

    if(this.email?.valid && this.password?.valid){
      let data : LoginInterfaces = {
        email : this.email.value!,
        password: this.password.value!,
      }
      this.api.login(data).subscribe((res: ResponseInterfaces) => {
        if(res.message == "Success"){
          console.log(res);
          let credential : LoginResponseInterfaces = res.data as LoginResponseInterfaces
          localStorage.setItem('keyToken', credential.token)
          localStorage.setItem('user', JSON.stringify(credential.user))
          this.router.navigateByUrl('home/dashboard')
        } else {
          this.snackbar.open(res.data as string, 'oke', {
            duration: 3000
          })
        }
      })
    } else {
      this.snackbar.open('Isi terlebih dahulu', 'oke', {
        duration: 3000
      })
    }
  }
}
