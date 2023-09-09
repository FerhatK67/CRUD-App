import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PersonenVerwaltung';


  flag = "none";

  switchDisplay(): void {
    this.flag == "none" ? this.flag = "block": this.flag = "none";
  }

}
