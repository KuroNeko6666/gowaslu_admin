import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AccountCreateInterfaces } from '../interfaces/account-create-interfaces';
import { AccountInterfaces } from '../interfaces/account-interfaces';
import { LoginInterfaces } from '../interfaces/login-interfaces';
import { ResponseInterfaces } from '../interfaces/response-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl = 'api/'

  login(data: LoginInterfaces) : Observable<ResponseInterfaces>{
    return this.http.post<ResponseInterfaces>(this.baseUrl + '/login', data)
  }

  logout(){
    localStorage.clear()
  }

  checkLogin(){
    if(localStorage.getItem('keyToken')){
      return true
    }
    return false
  }

  private getToken() {
    return localStorage.getItem('keyToken')
  }

  get headers(): any {
    return {'Authorization' : 'Bearer ' +
    this.getToken()}
  }



  //Account API

  getAllAccount() : Observable<ResponseInterfaces>{
    return this.http.get<ResponseInterfaces>(this.baseUrl + 'users', {headers:this.headers})
  }
  getAllUser() : Observable<ResponseInterfaces>{
    return this.http.get<ResponseInterfaces>(this.baseUrl + 'user/get/role/1', {headers:this.headers})
  }
  getAllAdmin() : Observable<ResponseInterfaces>{
    return this.http.get<ResponseInterfaces>(this.baseUrl + 'user/get/role/3', {headers:this.headers})
  }
  getAllOperator() : Observable<ResponseInterfaces>{
    return this.http.get<ResponseInterfaces>(this.baseUrl + 'user/get/role/2',{headers:this.headers})
  }

  getAccount(id: number) : Observable<ResponseInterfaces>{
    return this.http.get<ResponseInterfaces>(this.baseUrl + 'user/' + id, {headers:this.headers})
  }

  createAccount(data: AccountCreateInterfaces) : Observable<ResponseInterfaces> {
    return this.http.post<ResponseInterfaces>(this.baseUrl + 'register', data, {headers:this.headers})
  }

  updateAccount(data: AccountInterfaces, id: number) : Observable<ResponseInterfaces> {
    return this.http.put<ResponseInterfaces>(this.baseUrl + 'user/' + id, data, {headers: {'Authorization' : 'Bearer ' +
    this.getToken()}})
  }

  deleteAccount(id: number) : Observable<ResponseInterfaces> {
    return this.http.delete<ResponseInterfaces>(this.baseUrl + 'user/' + id, {headers:this.headers})
  }
}
