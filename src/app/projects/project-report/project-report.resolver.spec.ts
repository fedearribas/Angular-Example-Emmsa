import { TestBed } from '@angular/core/testing';

import { ProjectReportResolver } from './project-report.resolver';

describe('ProjectReportResolver', () => {
  let resolver: ProjectReportResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProjectReportResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
