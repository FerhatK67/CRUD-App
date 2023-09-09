import {Component, OnInit} from '@angular/core';
import { Person } from "../person";
import { PERSONEN } from "../mock-personen";

@Component({
  selector: 'app-personen',
  templateUrl: './personen.component.html',
  styleUrls: ['./personen.component.css']
})
export class PersonenComponent implements OnInit{


  personen = PERSONEN;

  newUser: Person = {
    id: 0,
    vorname: '',
    nachname: '',
    email: ''
  };

  addNewUser() {
    if (this.newUser.vorname.trim() !== "" && this.newUser.nachname.trim() !== "" && this.newUser.email.trim() !== "") {
      this.newUser.id = this.personen.length + 1;
      this.personen.push(this.newUser);

      this.newUser.vorname = this.titleCaseWord(this.newUser.vorname);
      this.newUser.nachname = this.titleCaseWord(this.newUser.nachname);

      //das beseitigen der angegeben Daten nachdem Klick auf den button "Add User"
    this.newUser = {id: 0, vorname: "", nachname: "", email: ""};
  } else {
      alert("Es wurden nicht alle Felder ausgefüllt!");
    }
  }

   titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  delete (person: Person): void {
    this.personen = this.personen.filter(p => p.id !== person.id);
  }

  editingPerson: Person | null = null;

  editPerson(person: Person):void{
   this.editingPerson =  {...person};
}

  updatePerson(): void {
    if(
      this.editingPerson &&
      this.editingPerson.vorname.trim() !== "" &&
      this.editingPerson.nachname.trim() !== "" &&
      this.editingPerson.email.trim() !== ""
    ) {

      const index = this.personen.findIndex(
        (p) => p.id === this.editingPerson!.id
      );
      if(index !== -1) {
        this.personen[index] = {...this.editingPerson}; //kopie
      }


      this.editingPerson = null;
    } else {
      alert("Es wurden nicht alle Felder ausgefüllt!");
    }
  }

  cancelEdit(): void {
    this.editingPerson = null;
  }

  sortPersonByNachname(): void {

    const sortedPerson = [...this.personen];

    sortedPerson.sort((a,b) =>
      {
      if (a.nachname < b.nachname) return -1;
      if (a.nachname > b.nachname) return  1;
      return  0;
      }
    );

    this.personen = sortedPerson;
  }

  ngOnInit() {}

}
