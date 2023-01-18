import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api/api.service';
import { DeleteComponent } from 'src/app/components/modals/delete/delete.component';
import { UserCreateComponent } from 'src/app/components/modals/user/user-create/user-create.component';
import { UserUpdateComponent } from 'src/app/components/modals/user/user-update/user-update.component';
import { AccountCreateInterfaces } from 'src/app/interfaces/account-create-interfaces';
import { AccountInterfaces } from 'src/app/interfaces/account-interfaces';
import { ResponseInterfaces } from 'src/app/interfaces/response-interfaces';
import { AccountModel } from 'src/app/models/account-model';

const ICON_DATA = {
  faEdit: faEdit,
  faDelete: faTrash,
  faArrowLeft: faChevronLeft,
  faArrowRight: faChevronRight,
}

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css']
})
export class UserMasterComponent {

  icon = ICON_DATA
  data: any[] = []
  allData: any[] = []
  veryAllData : any[] = []
  page = 0
  searchInput = new FormControl('')

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.searchInput.valueChanges.subscribe(val => {
      this.search(val!)
    })
    this.api.getAllUser().subscribe((res) => {
      if (res.message == 'Success') {
        this.veryAllData = res.data as AccountModel[]
        this.allData = this.paginate(this.veryAllData)
        this.data = this.allData[this.page]

      }
    }
    )
  }

  create() {
    this.dialog.open(UserCreateComponent, {
      width: '300',
      data: 1,
    }).afterClosed().subscribe((result: AccountCreateInterfaces | null) => {
      if (result != null) {
        this.api.createAccount(result).subscribe((res: ResponseInterfaces) => {
          console.log(res);
          if (res.message == 'Success') {
            console.log(res);
            this.router.navigateByUrl(this.router.url).then((res) => {
              if(res){
                this.snackbar.open('aksi berhasil', 'oke', {duration: 3000})
                window.location.reload()
              }
            })
          } else {
            this.snackbar.open('terjadi kesalahan', 'oke', {duration: 3000})
          }
        })
      }
    })
  }

  update(data: AccountModel) {
    this.dialog.open(UserUpdateComponent, {
      width: '300',
      data: data
    }).afterClosed().subscribe((res: AccountInterfaces | null) => {
      if (res != null) {
        this.api.updateAccount(res, data.id).subscribe((res: any) => {
          console.log(res);
          if (res.message == 'Success') {
            this.router.navigateByUrl(this.router.url).then((res) => {
              if(res){
                this.snackbar.open('aksi berhasil', 'oke', {duration: 3000})
                window.location.reload()
              }
            })
          } else {
            this.snackbar.open('terjadi kesalahan', 'oke', {duration: 3000})
          }
        })
      }
    })
  }

  delete(id: number) {
    this.dialog.open(DeleteComponent, {
      width: '300'
    }).afterClosed().subscribe((result: boolean | null) => {
      if (result) {
        this.api.deleteAccount(id).subscribe((res: ResponseInterfaces) => {
          if (res.message == 'Success') {
            this.router.navigateByUrl(this.router.url).then((res) => {
              if(res){
                this.snackbar.open('aksi berhasil', 'oke', {duration: 3000})
            window.location.reload()
              }
            })
          } else {
            this.snackbar.open('terjadi kesalahan', 'oke', {duration: 3000})
          }
        })
      }
    })
  }

  paginate(data: any[]) {
    let chunkSize: number = 5
    let queue: number = 0
    let result: any[] = []
    let chunk: any[] = []
    data.forEach((val: any) => {
      queue++
      chunk.push(val)
      if (queue >= chunkSize) {
        result.push(chunk)
        chunk = []
        queue = 0
      }
    });
    if (chunk.length) {
      result.push(chunk)
    }
    return result
  }

  search(text: string) {
    let data = this.veryAllData.filter((val) => val.name.includes(text!) || val.email.includes(text!))
    this.page = 0
    this.allData = this.paginate(data)
    this.data = this.allData[this.page]
  }

  changePage(increment: boolean) {
    if (increment) {
      this.page++
      this.data = this.allData[this.page]
    } else {
      this.page--
      this.data = this.allData[this.page]
    }
  }

}
