import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { AccountInterfaces } from 'src/app/interfaces/account-interfaces';
import { ActivityInterface } from 'src/app/interfaces/activity-interface';
import { NewsInterface } from 'src/app/interfaces/news-interface';
import { NewsComponent } from '../news/news.component';
import { UserCreateComponent } from '../user/user-create/user-create.component';

const ICON_DATA = {
  faUser: faUser,
  faMail: faEnvelope,
  faPassword: faLock
}

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {

  icon = ICON_DATA

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<NewsComponent>,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: ActivityInterface | null,

  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.data != null){
      this.name?.setValue(this.data.name);
      this.place?.setValue(this.data.place);
      this.time?.setValue(this.data.time);
    }
  }

  form = this.fb.group({
    name : ['', [Validators.required]],
    place : ['', [Validators.required]],
    time : [ '', [Validators.required]],
  })

  get name(){
    return this.form.get('name')
  }

  get place(){
    return this.form.get('place')
  }

  get time(){
    return this.form.get('time')
  }

  submit(){
    if(this.name?.valid && this.place?.valid && this.time?.valid){
      let data: ActivityInterface = {
        name: this.name.value!,
        place: this.place.value!,
        time: this.time?.value!
      }
      this.ref.close(data)
    } else {
      this.snackbar.open('terjadi kesalahan', 'oke', {duration:3000})
    }
  }

  close(){
    this.ref.close()
  }

  setTime(e:any){
    this.time?.setValue(e.target.value)
  }

}
