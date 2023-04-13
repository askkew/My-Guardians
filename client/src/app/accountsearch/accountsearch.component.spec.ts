import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsearchComponent } from './accountsearch.component';

describe('AccountsearchComponent', () => {
  let component: AccountsearchComponent;
  let fixture: ComponentFixture<AccountsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
