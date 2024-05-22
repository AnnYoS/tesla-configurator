import {Component, inject, Signal} from '@angular/core';
import {TeslaApiService} from "../../core/services/tesla-api.service";
import {Color, Model} from "../../core/model/vehicle";
import {toSignal} from "@angular/core/rxjs-interop";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ConfiguredVehicle} from "../../core/model/configured-vehicle";

@Component({
  selector: 'app-first-step',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './first-step.component.html',
  styleUrl: './first-step.component.scss'
})
export class FirstStepComponent {

  firstStepForm: FormGroup = new FormGroup({
    model: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
  });
  selectedTeslaModel: Model | undefined;
  configuredVehicle!: ConfiguredVehicle;

  private teslaApiService: TeslaApiService = inject(TeslaApiService);
  models: Signal<Model[]> = toSignal(this.teslaApiService.getModels(), {initialValue: []});

  changeModel(): void {
    if (this.firstStepForm.get('model')?.valid){
      this.selectedTeslaModel = this.models().find(m => m.code === this.firstStepForm.get('model')?.value);
      this.configuredVehicle = new ConfiguredVehicle();
      this.firstStepForm.get('color')?.setValue(this.selectedTeslaModel!.colors[0].code);
    }
  }

  onFormChange(): void {
    this.configuredVehicle.model = this.selectedTeslaModel ? this.selectedTeslaModel.code : '';
    this.configuredVehicle.color = this.firstStepForm.get('color')?.valid ? this.firstStepForm.get('color')?.value : '';
    this.teslaApiService.configuredVehicle.next(this.configuredVehicle);
    //this.teslaApiService.vehicleSignal.set(this.configuredVehicle);
  }
}
