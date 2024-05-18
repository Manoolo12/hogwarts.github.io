import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from '../person.model';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  teachers: Person[] = [];
  students: Person[] = [];
  currentDate: Date = new Date('1991-11-12');

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.personService.getPersons().subscribe((data: Person[]) => {
      this.teachers = data
        .filter(person => person.isTeacher)
        .sort((a, b) => new Date(a.arrivalDate).getTime() - new Date(b.arrivalDate).getTime());

      this.students = data
        .filter(person => !person.isTeacher)
        .sort((a, b) => {
          if (a.house === b.house) {
            return a.firstName.localeCompare(b.firstName);
          }
          return a.house.localeCompare(b.house);
        });
    });
  }

  calculateSchoolYear(arrivalDate: string): string {
    const arrivalYear = new Date(arrivalDate).getFullYear();
    const currentYear = this.currentDate.getFullYear();
    const year = currentYear - arrivalYear + 1;
    switch (year) {
      case 1: return 'First year';
      case 2: return 'Second year';
      case 3: return 'Third year';
      default: return `${year}th year`;
    }
  }
}
