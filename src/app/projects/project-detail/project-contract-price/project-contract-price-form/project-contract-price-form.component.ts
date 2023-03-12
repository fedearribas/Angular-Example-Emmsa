import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Observable, Subscription } from 'rxjs';
import { ComboService } from 'src/app/combo.service';
import { ProjectService } from 'src/app/projects/project.service';
import { DropDownListItem } from 'src/app/shared/models/dropdownlist-item';
import { ProjectContractPrice } from '../project-contract-price';

@Component({
  selector: 'app-project-contract-price-form',
  templateUrl: './project-contract-price-form.component.html',
  styleUrls: ['./project-contract-price-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContractPriceFormComponent implements OnInit, OnDestroy {

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

  private createSub!: Subscription;
  private editSub!: Subscription;

  constructor(private formBuilder: FormBuilder,
    private comboService: ComboService,
    private projectService: ProjectService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.currency$ = this.comboService.getCurrencyForProject(this.projectId);
  }

  protected onSave(e: PointerEvent): void {
    e.preventDefault();

    if (!this.contractPriceForm.valid) {
      this.contractPriceForm.markAllAsTouched();
    }

    const contractPrice = { ...this.model, ...this.contractPriceForm.value };

    if (this.isNew) {
      this.createSub = this.projectService.createContractPrice(contractPrice).subscribe({
        next: () => {
          this.closeForm();
          this.showSuccessNotification();
          this.saveCompleted.emit();
        },
        error: err => this.errorMessage = err
      });
    }
    else {
      this.editSub = this.projectService.editContractPrice(contractPrice).subscribe({
        next: () => {
          this.closeForm();
          this.showSuccessNotification();
          this.saveCompleted.emit();
        },
        error: err => this.errorMessage = err
      });
    }
  }

  protected onCancel(e: PointerEvent): void {
    e.preventDefault();
    this.closeForm();
  }

  openForm() {
    this.active = true;
    this.errorMessage = '';
    this.contractPriceForm.reset(this.model);
  }

  protected closeForm(): void {
    this.active = false;
    this.errorMessage = '';
  }

  private showSuccessNotification() {
    this.notificationService.show({
      content: "Success!",
      cssClass: "button-notification",
      animation: { type: "slide", duration: 400 },
      position: { horizontal: "center", vertical: "bottom" },
      type: { style: "success", icon: true },
      hideAfter: 2000
    });
  }

  ngOnDestroy(): void {
    if (this.createSub)
      this.createSub.unsubscribe();
    if (this.editSub)
      this.editSub.unsubscribe();
  }

}
