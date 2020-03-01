import {HttpHeaders} from "@angular/common/http";

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
}
