import {Component, OnInit} from '@angular/core';
import {Person} from "../person";
import {PERSONEN} from "../mock-personen";

@Component({
  selector: 'app-personen',
  templateUrl: './personen.component.html',
  styleUrls: ['./personen.component.css']
})
export class PersonenComponent implements OnInit {
  personen = PERSONEN;    //Array aus mock-personen initialisiert

  newUser: Person = {         //leeres Person Objekt
    id: 0,
    vorname: '',
    nachname: '',
    email: '',
    geburtsdatum: '',
    geschlecht: '',
  };


  //personen-hinzufügen

  addNewUser() {    //Hauptmethode zum Hinzufügen von Personen
    if (this.newUser.vorname.trim() !== "" && this.newUser.nachname.trim() !== "" && this.newUser.email.trim() !== "") { //Überprüfen, ob die Felder nicht leer sind
      this.newUser.id = this.personen.length + 1; //Id hinzuweisen
      this.personen.push(this.newUser); //neues Person Objekt wird in das Array eingefügt

      this.newUser.vorname = this.titleCaseWord(this.newUser.vorname);   //erstes Zeichen wird groß gesetzt
      this.newUser.nachname = this.titleCaseWord(this.newUser.nachname);

      if (this.sorted) {     //Überprüft, ob die Liste sortiert wurde und reiht es dementsprechend in die Liste ein
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
      alert("Es wurden nicht alle Felder ausgefüllt!");  //Fehlermeldung falls nicht alle Felder ausgefüllt wurden
    }
  }

  titleCaseWord(word: string) {  //1. Zeichen eines Wortes wird in groß umgewandelt
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  isAddUserClicked = false;

  toggleAddUser() {  //Ein- und Ausblenden der Benutzeroberfläche für das Hinzufügen von Personen. Siehe personen.component.html Z. 3/12
    this.isAddUserClicked = !this.isAddUserClicked;
    if (!this.isAddUserClicked) {
      this.newUser = {id: 0, vorname: "", nachname: "", email: "", geburtsdatum: "", geschlecht: ""};
    }
  }


  //personen-entfernen

  delete(person: Person): void { //Beim Klicken auf das Entfernen Button wird das Objekt aus der Liste gelöscht. Siehe personen.component.html Z. 72
    this.personen = this.personen.filter(p => p.id !== person.id);
  }


  //personen-editieren

  editingPerson: Person | null = null;  //Kopie-hülse des Person-objekts

  editPerson(person: Person): void { //Beim Klicken des Editier-Buttons wird diese Methode aufgerufen. Siehe personen.component.html Z. 71
    this.editingPerson = {...person};  //Das leere Objekt übernimmt alle Daten des ausgewählten Objekts
    document.documentElement.scrollTop = 0 // Der Nutzer wird nach ganz oben der Seite geführt in der die Felder zu dieser Methode auftauchen
  }

  updatePerson(): void { //Speichert die Änderungen der Daten ab
    if (  //stellt sicher, dass alle Felder ausgefüllt wurden
      this.editingPerson &&
      this.editingPerson.vorname.trim() !== "" &&
      this.editingPerson.nachname.trim() !== "" &&
      this.editingPerson.email.trim() !== ""
    ) {

      const index = this.personen.findIndex( //suchen wir den Index des ausgewählten Person-Objekts
        (p) => p.id === this.editingPerson!.id
      );
      if (index !== -1) {
        this.editingPerson.vorname = this.titleCaseWord(this.editingPerson.vorname);   //1. Zeichen des Vornamen wird groß geschrieben
        this.editingPerson.nachname = this.titleCaseWord(this.editingPerson.nachname); //1. Zeichen des Nachnamen wird groß geschrieben

        this.personen[index] = {...this.editingPerson}; //Das Objekt wird mit den Änderungen geupdatet
      }

      this.editingPerson = null; //Kopie wird geleert

      if (this.sorted) {     //Überprüft, ob die Liste sortiert wurde und reiht es dementsprechend in die Liste ein
        this.sortedPerson.sort((a, b) => {
            if (a.nachname < b.nachname) return -1;
            if (a.nachname > b.nachname) return 1;
            return 0;
          }
        );
        this.personen = this.sortedPerson;
      }

    } else {
      alert("Es wurden nicht alle Felder ausgefüllt!");  //Fehlermeldung falls nicht alle Felder ausgefüllt wurden
    }
  }

  cancelEdit(): void {  // Schließt den Editierberecih. Siehe Personen.component.html Z. 23
    this.editingPerson = null;
  }


  //personen-sortieren

  sorted = false
  sortedPerson = [...this.personen];

  sortPersonByNachname(): void { //Sortieren von Personen nach Nachname oder Id

    if (!this.sorted) {  //überprüft, ob die Liste sortiert wurde
      this.sorted = true;  //setzt den Soriterungswahrheitswert um
      this.sortedPerson.sort((a, b) => { //sort Funktion nach Nachname
          if (a.nachname < b.nachname) return -1; //1 nach oben in der Liste
          if (a.nachname > b.nachname) return 1; //1 nach unten
          return 0;  //sonst verweilt es am selben Index
        }
      );
      this.personen = this.sortedPerson; //Liste wird mit der sortierten Liste ersetzt
    } else if (this.sorted) {  //Liste wird nach Id sortiert falls die Liste schon nach Nachname sortiert wurde
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

  showDetailPerson: Person | null = null; //kopie eines Person-Objekts

  showInfoPerson(person: Person): void { //Methode, die die Daten der ausgewählten Person nimmt und in inputs anzeigt
    this.showDetailPerson = {...person}; //Kopie Objekt
    document.documentElement.scrollTop = 0 //Nutzer wird nach oben gestzt bei der die Felder auftauchen
  }

  cancelInfo(): void {  //Ausblenden der Info-Felder beim Klick auf "Schließen". Siehe Z. 49
    this.showDetailPerson = null;
  }

  ngOnInit() {
  }

  protected readonly PERSONEN = PERSONEN;
}
