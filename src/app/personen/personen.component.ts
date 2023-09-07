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



  ngOnInit() {

  }
}
