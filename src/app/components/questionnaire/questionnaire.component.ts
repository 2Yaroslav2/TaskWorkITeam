import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IFramework} from "../../models/interfaces/framework.interface";
import {QuestionnaireService} from "../../service/questionnaire.service";
import {debounceTime} from "rxjs/operators";
import {IHobby} from "../../models/interfaces/hobby.interface";

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  form!: FormGroup;
  formHobby!: FormGroup;

  selectFramework: boolean = true;

  hobbyList: IHobby[] = [];
  frameworkList: IFramework[] = [];
  versionList: string[] = [];
  flagAddBlock: boolean = false;

  constructor(private service: QuestionnaireService) {
    this.service.getAll().subscribe((data: any) => {
      this.frameworkList = data["framework"];
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'firstName' : new FormControl('', [Validators.required]),
      'lastName' : new FormControl('', [Validators.required]),
      'dateOfBirth' : new FormControl('', [Validators.required]),
      'framework' : new FormControl('', [Validators.required]),
      'frameworkVersion' : new FormControl('', [Validators.required]),
      'email' : new FormControl('', [Validators.required, Validators.email])
    });

    this.formHobby = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'duration': new FormControl('', [Validators.required])
    });
  }

  onSelect(select: any) {
    this.selectFramework = false;
    this.versionList = this.frameworkList[select].version;
  }

  saveUser() {
    if (this.form.valid && this.hobbyList.length != 0){
      const user = this.form.getRawValue();

      let day = user.dateOfBirth.getDate();
      let month = user.dateOfBirth.getMonth() + 1;
      let year = user.dateOfBirth.getFullYear();
      let date = day + '-' + month + '-' + year;

      this.service.create({
       ...user,
        dateOfBirth: date,
        hobby: this.hobbyList
      }).pipe(debounceTime(2000)).subscribe(result=>{
        console.log('res: ', result)
        alert('Result: ' + result);
      });
    }
    else{
      alert('Form is invalid or has no hobby');
    }
  }

  addHobby() {
    if (this.formHobby.valid){
      const hobby = this.formHobby.getRawValue();
      this.hobbyList.push({...hobby});
      this.flagAddBlock = true;
    }
  }
}
