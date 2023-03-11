import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComboService } from 'src/app/combo.service';

@Component({
  selector: 'app-project-additional-information',
  templateUrl: './project-additional-information.component.html',
  styleUrls: ['./project-additional-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectAdditionalInformationComponent {

  @Input() formGroup!: FormGroup;
  @Input() isEditMode!: boolean;

  cboDefaultItem = this.comboService.chooseOneItemValue;
  contractScope$ = this.comboService.getContractScope();
  contractStage$ = this.comboService.getContractStage();
  productLine$ = this.comboService.getProductLine();
  customerType$ = this.comboService.getCustomerType();
  projectManager$ = this.comboService.getProjectManager();
  commercialProjectManager$ = this.comboService.getCommercialProjectManager();
  
  constructor(private comboService: ComboService) {}
}
