import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComboService } from 'src/app/combo.service';
import { DropdownModel } from 'src/app/shared/models/dropdown-model';

@Component({
  selector: 'app-project-main-information',
  templateUrl: './project-main-information.component.html',
  styleUrls: ['./project-main-information.component.scss']
})
export class ProjectMainInformationComponent {

  @Input() public formGroup!: FormGroup;
  cboDefaultItem: DropdownModel = { Text: 'Choose one item...' };
  countries$ = this.comboService.getCountries();

  constructor(private comboService: ComboService) {}

}
