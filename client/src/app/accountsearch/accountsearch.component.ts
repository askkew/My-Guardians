import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-accountsearch',
  templateUrl: './accountsearch.component.html',
  styleUrls: ['./accountsearch.component.css']
})
export class AccountsearchComponent implements OnInit {
  displayName: string;
  displayNameCode: number;
  characterList: any[] = [];
  characterInventory: any[] = [];

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.displayName = '';
    this.displayNameCode = 0;
    this.characterList = [];
    this.characterInventory = [];
  }

  ngOnInit() {
  }

  onSubmit() {
    const data = {
      displayName: this.displayName,
      displayNameCode: this.displayNameCode,
    };
  
    this.http.post<any>(`http://localhost:5000/search-and-inventory`, data).subscribe(
      response => {
        this.toastr.success('Found the account!');
        console.log(response);
        const characterData = response.characters;
        const characterList = Object.values(characterData);
        this.characterList = characterList;
        const characterInventory = response.inventorys;
        this.characterInventory = characterInventory;
      },
      error => {
        console.error(error);
        this.toastr.error('Error searching that account!');
      }
    );
  }
}