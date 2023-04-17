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
  characterInfo: any[] = [];

  constructor(private http: HttpClient) {
    this.displayName = '';
    this.displayNameCode = 0;
    this.characterList = [];
    this.characterInfo = [];
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
        console.log(characterList);
        this.characterList = characterList;
        const characterInfo = response.characterInfo;
        console.log(characterInfo);
        this.characterInfo = characterInfo;
      },
      error => {
        console.error(error);
      }
    );
  }
  

  getCharacterInfo(membershipType: number, membershipId: string, characterId: string) {
    this.http.get<any>(`http://localhost:5000/inventory/${membershipType}/${membershipId}/${characterId}`).subscribe(
      response => {
        const characterInventory = response;
        console.log(characterInventory);
        // Do whatever you want with the characterInventory here
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



    // this.http.get<any>(`http://localhost:5000/inventory/${membershipId}/${membershipType}/${characterId}`).subscribe(
            //   response => {
            //     const characterList = Object.values(response);
            //     console.log(characterList);
            //     this.characterList = characterList;
            //   },
            //   error => {
            //     console.error(error);
            //   }
            // );