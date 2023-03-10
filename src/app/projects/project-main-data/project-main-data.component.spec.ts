import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMainDataComponent } from './project-main-data.component';

describe('ProjectMainDataComponent', () => {
  let component: ProjectMainDataComponent;
  let fixture: ComponentFixture<ProjectMainDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectMainDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMainDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
