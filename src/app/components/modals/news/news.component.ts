import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { AccountCreateInterfaces } from 'src/app/interfaces/account-create-interfaces';
import { NewsInterface } from 'src/app/interfaces/news-interface';
import { UserCreateComponent } from '../user/user-create/user-create.component';

const ICON_DATA = {
  faUser: faUser,
  faMail: faEnvelope,
  faPassword: faLock
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  icon = ICON_DATA

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<NewsComponent>,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.data != null){
      this.title?.setValue(this.data.title);
      this.content?.setValue(this.data.content);
      // this.thumbnail?.setValue(this.data.thumbnail);
    }
  }

  image : any = null

  form = this.fb.group({
    title : ['', [Validators.required]],
    content : ['', [Validators.required]],
  })

  get title(){
    return this.form.get('title')
  }

  get content(){
    return this.form.get('content')
  }

  get thumbnail(){
    return this.form.get('thumbnail')
  }

  submit(){
    if(this.title?.valid && this.content?.valid){
      let data: NewsInterface = {
        title: this.title.value!,
        content: this.content.value!,
        thumbnail: this.image
      }
      this.ref.close(data)
    } else {
      this.snackbar.open('terjadi kesalahan', 'oke', {duration:3000})
    }
  }

  close(){
    this.ref.close()
  }

  onFileSelect(input: any) {
    // console.log(input.files[0]);
    this.image = input.files[0]
    // if (input.files && input.files[0]) {
    //   var reader = new FileReader();
    //   reader.onload = (e: any) => {
    //     console.log('Got here: ', e.target.files[0].name);
    //     // this.obj.photoUrl = e.target.result;
    //   }
    //   reader.readAsDataURL(input.files[0]);
    // }
  }
}


