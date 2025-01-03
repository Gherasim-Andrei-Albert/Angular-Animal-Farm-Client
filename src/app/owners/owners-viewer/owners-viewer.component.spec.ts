import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersViewerComponent } from './owners-viewer.component';

describe('OwnersViewerComponent', () => {
  let component: OwnersViewerComponent;
  let fixture: ComponentFixture<OwnersViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnersViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnersViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
