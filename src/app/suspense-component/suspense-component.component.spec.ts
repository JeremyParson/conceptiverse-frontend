import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenseComponentComponent } from './suspense-component.component';

describe('SuspenseComponentComponent', () => {
  let component: SuspenseComponentComponent;
  let fixture: ComponentFixture<SuspenseComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspenseComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspenseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
