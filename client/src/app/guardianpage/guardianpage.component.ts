import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-guardianpage',
  templateUrl: './guardianpage.component.html',
  styleUrls: ['./guardianpage.component.css']
})
export class GuardianpageComponent {
  @Input() characterList: any[];
  @Input() characterInventory: any[];

  constructor() {
    this.characterList = [];
    this.characterInventory = [];
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