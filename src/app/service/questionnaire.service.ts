import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IFramework} from "../models/interfaces/framework.interface";
import {IUser} from "../models/interfaces/user.interface";
import {Observable} from "rxjs";

@Injectable()
export class QuestionnaireService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(){
    return  this.httpClient.get('assets/frameworks.json');
  }

  create(user: IUser): Observable<any>{
    console.log('user: ', user);

    if (user.email == 'test@test.test'){
      return new Observable((observer) =>{ observer.next('This Email already exists')});
    }
    else {
      return new Observable((observer) =>{ observer.next('successful')});
    }
  }
}
