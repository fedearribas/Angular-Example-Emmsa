import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComboService } from 'src/app/combo.service';

@Component({
  selector: 'app-project-main-information',
  templateUrl: './project-main-information.component.html',
  styleUrls: ['./project-main-information.component.scss']
})
export class ProjectMainInformationComponent {

  @Input() public formGroup!: FormGroup;
  cboDefaultItem = this.comboService.chooseOneItemValue;
  countries$ = this.comboService.getCountries();

  constructor(private comboService: ComboService) {}

}
