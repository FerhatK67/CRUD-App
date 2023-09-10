import {Component, OnInit} from '@angular/core';
import {Person} from "../person";
import {PERSONEN} from "../mock-personen";

@Component({
  selector: 'app-personen',
  templateUrl: './personen.component.html',
  styleUrls: ['./personen.component.css']
})
export class PersonenComponent implements OnInit {
  personen = PERSONEN;

  infoPerson: Person = {
    id: 0,
    vorname: '',
    nachname: '',
    email: '',
    geburtsdatum: "",
    geschlecht: "",
  }

  newUser: Person = {
    id: 0,
    vorname: '',
    nachname: '',
    email: '',
    geburtsdatum: "",
    geschlecht: "",
  };


  //personen-hinzufügen

  addNewUser() {
    if (this.newUser.vorname.trim() !== "" && this.newUser.nachname.trim() !== "" && this.newUser.email.trim() !== "") {
      this.newUser.id = this.personen.length + 1;
      this.personen.push(this.newUser);

      this.newUser.vorname = this.titleCaseWord(this.newUser.vorname);
      this.newUser.nachname = this.titleCaseWord(this.newUser.nachname);

      if (this.sorted) {
        this.sortedPerson.sort((a, b) => {
            if (a.nachname < b.nachname) return -1;
            if (a.nachname > b.nachname) return 1;
            return 0;
          }
        );
        this.personen = this.sortedPerson;
      }

      //das beseitigen der angegeben Daten nachdem Klick auf den button "Add User"
      this.newUser = {id: 0, vorname: "", nachname: "", email: "", geburtsdatum: "", geschlecht: ""};
    } else {
      alert("Es wurden nicht alle Felder ausgefüllt!");
    }
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  isAddUserClicked = false;

  toggleAddUser() {
    this.isAddUserClicked = !this.isAddUserClicked;
    if (!this.isAddUserClicked) {
      this.newUser = {id: 0, vorname: "", nachname: "", email: "", geburtsdatum: "", geschlecht: ""};
    }
  }


  //personen-entfernen

  delete(person: Person): void {
    this.personen = this.personen.filter(p => p.id !== person.id);
  }

  editingPerson: Person | null = null;

  //personen-editieren

  editPerson(person: Person): void {
    this.editingPerson = {...person};
    document.documentElement.scrollTop = 0
  }

  updatePerson(): void {
    if (
      this.editingPerson &&
      this.editingPerson.vorname.trim() !== "" &&
      this.editingPerson.nachname.trim() !== "" &&
      this.editingPerson.email.trim() !== ""
    ) {

      const index = this.personen.findIndex(
        (p) => p.id === this.editingPerson!.id
      );
      if (index !== -1) {
        this.editingPerson.vorname = this.titleCaseWord(this.editingPerson.vorname);
        this.editingPerson.nachname = this.titleCaseWord(this.editingPerson.nachname);

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


  //personen-sortieren

  sorted = false
  sortedPerson = [...this.personen];

  sortPersonByNachname(): void {

    if (!this.sorted) {
      this.sorted = true;
      this.sortedPerson.sort((a, b) => {
          if (a.nachname < b.nachname) return -1;
          if (a.nachname > b.nachname) return 1;
          return 0;
        }
      );
      this.personen = this.sortedPerson;
    } else if (this.sorted) {
      this.sorted = false;
      this.sortedPerson.sort((a, b) => {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        }
      );
    }
  }


  //personen-details

  showDetailPerson: Person | null = null;

  showInfoPerson(person: Person): void {
    this.showDetailPerson = {...person};
    document.documentElement.scrollTop = 0
  }

  cancelInfo(): void {
    this.showDetailPerson = null;
  }

  ngOnInit() {
  }

  protected readonly PERSONEN = PERSONEN;
}
