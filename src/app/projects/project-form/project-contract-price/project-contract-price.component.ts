import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../../project';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-project-contract-price',
  templateUrl: './project-contract-price.component.html',
  styleUrls: ['./project-contract-price.component.scss']
})
export class ProjectContractPriceComponent implements OnInit {

  project$!: Observable<Project>;
  

  constructor(private projectService: ProjectService,
    private route: ActivatedRoute) { }
  
  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.project$ = this.projectService.getProject(id);
  }

}
