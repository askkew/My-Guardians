import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guardianpage',
  templateUrl: './guardianpage.component.html',
  styleUrls: ['./guardianpage.component.css']
})
export class GuardianpageComponent implements OnInit {
  displayName: string;
  displayNameCode: number;
  characterList: any[] = [];
  characterInventory: any[] = [];

  constructor(private http: HttpClient) {
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
        console.log(response);
        const characterData = response.characters;
        const characterList = Object.values(characterData);
        this.characterList = characterList;
        const characterInventory = response.inventorys;
        this.characterInventory = characterInventory;
      },
      error => {
        console.error(error);
      }
    );
  }

  getClassName(classHash: number): string {
    switch (classHash) {
      case 2271682572:
        return 'Warlock';
      case 671679327:
        return 'Hunter';
      case 3655393761:
        return 'Titan';
      default:
        return 'Unknown';
    }
  }
  
  getRaceName(raceHash: number): string {
    switch (raceHash) {
      case 3887404748:
        return 'Human';
      case 2803282938:
        return 'Awoken';
      case 898834093:
        return 'Exo';
      default:
        return 'Unknown';
    }
  }
}