import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAdditionalInformationComponent } from './project-additional-information.component';

describe('ProjectAdditionalInformationComponent', () => {
  let component: ProjectAdditionalInformationComponent;
  let fixture: ComponentFixture<ProjectAdditionalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectAdditionalInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectAdditionalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
