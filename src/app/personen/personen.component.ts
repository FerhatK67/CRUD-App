import {Component, OnInit} from '@angular/core';
import { Person } from "../person";

@Component({
  selector: 'app-personen',
  templateUrl: './personen.component.html',
  styleUrls: ['./personen.component.css']
})
export class PersonenComponent implements OnInit{

  personen: Person[] = [
    {id: 1, vorname: "Jon", nachname: "Snow", email: "jon@mail.com"},
    {id: 2, vorname: "Daenerys", nachname: "Targaryen", email: "daenerys@mail.com"},
    {id: 3, vorname: "Tyrion", nachname: "Lannister", email: "tyrion@mail.com"},
    {id: 4, vorname: "Arya", nachname: "Stark", email: "arya@mail.com"},
    {id: 5, vorname: "Cersei", nachname: "Lannister", email: "cersei@mail.com"},
    {id: 6, vorname: "Jaime", nachname: "Lannister", email: "jaime@mail.com"},
    {id: 7, vorname: "Sansa", nachname: "Stark", email: "sansa@mail.com"},
   ]

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
      //das beseitigen der angegeben Daten nachdem Klick auf den button "Add User"
    this.newUser = {id: 0, vorname: "", nachname: "", email: ""};
  } else {
      alert("Es wurden nicht alle Felder ausgefüllt!");
    }
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

  ngOnInit() {}

}
