import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectContractPriceComponent } from './project-contract-price.component';

describe('ProjectContractPriceComponent', () => {
  let component: ProjectContractPriceComponent;
  let fixture: ComponentFixture<ProjectContractPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectContractPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectContractPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
