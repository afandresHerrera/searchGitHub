import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../models/user';
import { AppListUserService } from '../services/app-list-user.service';

@Component({
  selector: 'app-users-git-hub',
  templateUrl: './users-git-hub.component.html',
  styleUrls: ['./users-git-hub.component.css']
})
export class UsersGitHubComponent implements OnInit {

  public user: User;
  public form: FormGroup;
  public long: number = 0;
  public longSp: boolean = false;

  public objResultado: any = []

  public obj = [
    { startPx: 10, endPx: 30 },
    { startPx: 55, endPx: 65 },
    { startPx: 35, endPx: 50 },
    { startPx: 20, endPx: 40 },
    { startPx: 60, endPx: 70 }
  ]

  constructor(private fb: FormBuilder, private _listUserServici: AppListUserService) {
    this.user = {
      name: '',
      login: '',
      avatar_url: '',
      created_ad: '',
      location: '',
      bio: '',
      type: '',
      public_repos: '',
      public_gists: '',
      score: Math.random(),
      nameScore: ''
    }

    this.form = this.fb.group({
      filterTex: [null]
    })
  }

  ngOnInit() {
    this.objSuperpuestos();
  }

  searchText() {
    console.log(this.form.controls.filterTex.value.length)
    this.long = this.form.controls.filterTex.value ? this.form.controls.filterTex.value.length : 0
    if (this.form.controls.filterTex.value == '') {
      this.user = {
        name: '',
        login: '',
        avatar_url: '',
        created_ad: '',
        location: '',
        bio: '',
        type: '',
        public_repos: '',
        public_gists: '',
        score: Math.random(),
        nameScore: ''
      }
      this.form.reset();
    }
    if ( this.form.controls.filterTex.value.length > 3) {
      return
    }
    if (this.form.controls.filterTex.value.length >= 3) {
      this._listUserServici.getUsesr(this.form.controls.filterTex.value).subscribe((data: any) => {
        if (data) {
          this.longSp = true
          this.user = data
          console.log(this.user);
          setTimeout(() => {
            this.longSp = false
          }, 1000);
        } 

      }, err => {
        console.log(err)
        alert(err.error.message)
        return
      })
    }
  }

  objSuperpuestos() {
    // lo primero es ordenar de nemor a mayor el array de objetos
    this.obj.sort(function (a, b) {
      // A va primero que B
      if (a.startPx < b.startPx)
        return -1;
      // B va primero que A
      else if (a.startPx > b.startPx)
        return 1;
      // A y B son iguales
      else
        return 0;
    });
    console.log('matriz ordenada', this.obj);

    // luego recorremos y filtramos los objetos q se interponen

    this.objResultado.push(this.obj[0])

    for (let i in this.obj) {
      for (let j in this.objResultado) {

        if (this.obj[i].startPx > this.objResultado[j].startPx && this.obj[i].startPx > this.objResultado[j].endPx) {
          this.objResultado.push(this.obj[i])
        } else if (this.obj[i].startPx > this.objResultado[j].startPx && this.obj[i].startPx < this.objResultado[j].endPx) {
          this.objResultado.push({ startPx: this.objResultado[j].startPx, endPx: this.obj[i].endPx })
          delete this.objResultado[j]
        } else if (this.obj[i].startPx < this.objResultado[j].startPx && this.obj[i].startPx < this.objResultado[j].endPx) {
          this.objResultado[j] = { startPx: this.objResultado[j].startPx, endPx: this.obj[i].endPx }
          delete this.objResultado[+j - 1]
        }
        delete this.objResultado[4]
      }
    }
    console.log('matriz resultado', this.objResultado);
  }


}

