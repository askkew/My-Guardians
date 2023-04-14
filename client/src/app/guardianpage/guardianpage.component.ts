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

  constructor(private http: HttpClient) {
    this.displayName = '';
    this.displayNameCode = 0;
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
            console.log(response);
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
