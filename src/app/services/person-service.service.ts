import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { person } from '../model/person.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonServiceService {

  private apiUrl = "https://jsonplaceholder.typicode.com/users";

  constructor(private http: HttpClient) { }

  listPeople(): Observable<person[]> {
    return this.http.get<person[]>(this.apiUrl);
  }

  getPerson(id: number) {
    return this.http.get<person>(`${this.apiUrl}/${id}`)
  }

  postPerson(objeto: person) {
    return this.http.post<Response>(this.apiUrl, objeto, {observe: "response"});
  }

}
