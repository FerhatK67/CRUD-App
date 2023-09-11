import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //Die Tabellenansicht wird erst beim Klicken des "Personen Liste" buttons eingeblendet. Zuvor sieht man nur den Titel
  // und den button
  
  title = 'PersonenVerwaltung';
  flag = "none";

  switchDisplay(): void {
    this.flag == "none" ? this.flag = "flex" : this.flag = "none";
  }

}
