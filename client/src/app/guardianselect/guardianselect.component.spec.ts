import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianselectComponent } from './guardianselect.component';

describe('GuardianselectComponent', () => {
  let component: GuardianselectComponent;
  let fixture: ComponentFixture<GuardianselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardianselectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardianselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
