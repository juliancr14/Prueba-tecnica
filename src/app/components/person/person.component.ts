import { Component, inject, Input, OnInit } from '@angular/core';
import { PersonServiceService } from '../../services/person-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { person } from '../../model/person.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-person',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent implements OnInit{

  @Input('id')idPerson!: number;
  private _personService = inject(PersonServiceService);
  public formBuild = inject(FormBuilder);

  public formPerson: FormGroup = this.formBuild.group({
    name: [''], 
    username: [""],
    email:[""],
    address:[""], 
    phone:0, 
    website:[""], 
    company:[""]
  })

  constructor(private router: Router) {}

  ngOnInit(): void {
    if(this.idPerson != 0) {
      this._personService.getPerson(this.idPerson).subscribe({
        next: (data) => {
          this.formPerson.patchValue({
            name: data.name,
            username: data.username,
            email: data.email,
            address: data.address, 
            phone:data.phone, 
            website:data.website, 
            company:data.company
          })
        },
        error: (e) => {
          console.log(e);
        }
      })
    }
  }

  save() {
    const objeto: person = {
      id: this.idPerson,
      name: this.formPerson.value.name, 
      username: this.formPerson.value.username,
      email:this.formPerson.value.email,
      address:this.formPerson.value.address, 
      phone:this.formPerson.value.phone, 
      website:this.formPerson.value.website, 
      company:this.formPerson.value.company
    }

    if(this.idPerson == 0) {
      this._personService.postPerson(objeto).subscribe({
        next: (data) => {
          if(data.status == 201) {
            alert("Creado exitosamente");
            this.router.navigate([""]);
          }
        },
        error: (e) => {
          console.log(e);
        }
      })
    }
  }

  back() {
    this.router.navigate([""])
  }

}
