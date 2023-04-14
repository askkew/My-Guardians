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
  membershipType: number;

  constructor(private http: HttpClient) {
    this.displayName = '';
    this.displayNameCode = 0;
    this.membershipType = 0;
  }

  ngOnInit() {
  }

  onSubmit() {
    const data = {
      displayName: this.displayName,
      displayNameCode: this.displayNameCode,
      membershipType: this.membershipType
    };

    this.http.post<any>(`http://localhost:5000/search/${this.membershipType}`, data).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  }
}