import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../project';

@Component({
  selector: 'app-project-main-data',
  templateUrl: './project-main-data.component.html',
  styleUrls: ['./project-main-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectMainDataComponent {
  @Input() project$!: Observable<Project>;
  @Input() expanded!: boolean;

}
