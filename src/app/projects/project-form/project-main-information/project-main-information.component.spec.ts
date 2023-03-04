import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMainInformationComponent } from './project-main-information.component';

describe('ProjectMainInformationComponent', () => {
  let component: ProjectMainInformationComponent;
  let fixture: ComponentFixture<ProjectMainInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectMainInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMainInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
