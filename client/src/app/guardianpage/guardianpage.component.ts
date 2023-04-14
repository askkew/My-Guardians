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

  constructor(private http: HttpClient) {
    this.displayName = '';
    this.displayNameCode = 0;
    this.characterList = [];
  }

  ngOnInit() {
  }

  onSubmit() {
    const data = {
      displayName: this.displayName,
      displayNameCode: this.displayNameCode,
    };

    this.http.post<any>(`http://localhost:5000/search`, data).subscribe(
      response => {
        console.log(response);
        const { membershipType, membershipId } = response;
        this.http.get<any>(`http://localhost:5000/characters/${membershipType}/${membershipId}`).subscribe(
          response => {
            const characterList = Object.values(response);
            console.log(characterList);
            this.characterList = characterList;
          },
          error => {
            console.error(error);
          }
        );
      },
      error => {
        console.error(error);
      }
    );
  }
}
