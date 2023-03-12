import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Observable } from 'rxjs';
import { ComboService } from 'src/app/combo.service';
import { ProjectService } from 'src/app/projects/project.service';
import { DropDownListItem } from 'src/app/shared/models/dropdownlist-item';
import { ProjectContractPrice } from '../project-contract-price';

@Component({
  selector: 'app-project-contract-price-form',
  templateUrl: './project-contract-price-form.component.html',
  styleUrls: ['./project-contract-price-form.component.scss']
})
export class ProjectContractPriceFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private comboService: ComboService,
    private projectService: ProjectService,
    private notificationService: NotificationService) { }

  private _model!: ProjectContractPrice;

  @Input() projectId!: number;
  @Input() isNew = false;

  @Input() get model() {
    return this._model;
  }

  set model(m: ProjectContractPrice) {
    this._model = m;
    this.contractPriceForm.reset(m);
  }

  @Output() cancel: EventEmitter<undefined> = new EventEmitter();
  @Output() saveCompleted: EventEmitter<void> = new EventEmitter();

  protected active = false;
  protected cboDefaultItem = this.comboService.chooseOneItemValue;
  protected serviceType$ = this.comboService.getServiceType();
  protected currency$!: Observable<DropDownListItem<string>[]>;
  protected errorMessage!: string;

  contractPriceForm: FormGroup = this.formBuilder.group({
    ServiceTypeId: [null, Validators.required],
    ApplyByWTG: [false],
    PeriodFrom: [null, Validators.required],
    PeriodTo: [null, Validators.required],
    CurrencyId: [null, Validators.required],
    Price: [null, Validators.required]
  });

  ngOnInit() {
    this.currency$ = this.comboService.getCurrencyForProject(this.projectId);
  }

  protected onSave(e: PointerEvent): void {
    e.preventDefault();

    if (!this.contractPriceForm.valid) {
      this.contractPriceForm.markAllAsTouched();
    }

    const contractPrice = { ...this.model, ...this.contractPriceForm.value };
    this.projectService.createContractPrice(contractPrice).subscribe({
      next: () => {
        this.closeForm();
        this.saveCompleted.emit();
      },
      error: err => this.errorMessage = err
    });
  }

  protected onCancel(e: PointerEvent): void {
    e.preventDefault();
    this.closeForm();
  }

  open() {
    this.active = true;
    this.errorMessage = '';
    this.contractPriceForm.reset(this.model);
  }

  closeForm(): void {
    this.active = false;
    this.errorMessage = '';
  }

}
