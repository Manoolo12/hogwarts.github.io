import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private url = 'assets/persons.json'; 

  constructor(private http: HttpClient) {}

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.url).pipe(
      map(data => data.map(person => new Person(
        person.id,
        person.firstName,
        person.lastName,
        person.description,
        person.arrivalDate,
        person.house,
        person.isTeacher,
        person.assignment
      )))
    );
  }
}
