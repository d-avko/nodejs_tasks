import {HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  setToken(token: string){
    localStorage.setItem('token', token);
  }

  authorized(){
    return localStorage.getItem('token') != null;
  }

  getAuthorizedHeaders(){
    let headers = new HttpHeaders();
    return headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
