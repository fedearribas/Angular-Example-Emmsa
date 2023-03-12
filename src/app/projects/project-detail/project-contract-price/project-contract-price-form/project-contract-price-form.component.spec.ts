import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectContractPriceFormComponent } from './project-contract-price-form.component';

describe('ProjectContractPriceFormComponent', () => {
  let component: ProjectContractPriceFormComponent;
  let fixture: ComponentFixture<ProjectContractPriceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectContractPriceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectContractPriceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
