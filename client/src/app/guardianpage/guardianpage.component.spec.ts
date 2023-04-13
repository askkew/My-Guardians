import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianpageComponent } from './guardianpage.component';

describe('GuardianpageComponent', () => {
  let component: GuardianpageComponent;
  let fixture: ComponentFixture<GuardianpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardianpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardianpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
