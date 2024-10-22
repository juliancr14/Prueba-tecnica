import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { PersonServiceService } from '../../services/person-service.service';
import { person } from '../../model/person.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public personlist: person[] = [];
  public displayedColumns: string[] = ["id", "name", "username", "email", "address", "phone", "website", "company", "Action"];

  getPeople() {
    this._personServices.listPeople().subscribe({
      next: (data) => {
        if(data.length > 0) {
          this.personlist = data;
          console.log(this.personlist);
        }
      },
      error: (error) => {
        console.log(error.message);
      }
    })
  }

  constructor(private router: Router, private _personServices: PersonServiceService) {
    this.getPeople();
  }

  postPerson() {
    this.router.navigate(["/person", 0])
  }

  getPerson(objeto: person) {
    this.router.navigate(["/person", objeto.id]);
  }

}
