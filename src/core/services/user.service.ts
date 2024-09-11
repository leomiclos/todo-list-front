import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/enviroment';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {


  constructor(private httpClient: HttpClient, private router: Router) {}


  apiUri = environment.API_URI

  login(user: any){
    console.log(user);

    return this.httpClient.post<any>(`${this.apiUri}/api/login`, user)
  }

  registrar(user: any){
    return this.httpClient.post<any>(`${this.apiUri}/api/register`, {user})
  }

}
