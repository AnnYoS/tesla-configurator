import {Component, inject, Signal} from '@angular/core';
import {TeslaApiService} from "../../core/services/tesla-api.service";
import {Model} from "../../core/model/vehicle";
import {toSignal} from "@angular/core/rxjs-interop";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ConfiguredVehicle} from "../../core/model/configured-vehicle";

@Component({
  selector: 'app-first-step',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './first-step.component.html',
  styleUrl: './first-step.component.scss'
})
export class FirstStepComponent {

  private teslaApiService: TeslaApiService = inject(TeslaApiService);
  models: Signal<Model[]> = toSignal(this.teslaApiService.getModels(), {initialValue: []});

  configuredVehicleSignal: Signal<ConfiguredVehicle> = this.teslaApiService.configuredVehicleSignal;
  selectedTeslaModelSignal: Signal<Model> = this.teslaApiService.selectedModelSignal;

  firstStepForm: FormGroup = new FormGroup({
    model: new FormControl(this.configuredVehicleSignal().model, [Validators.required]),
    color: new FormControl(this.configuredVehicleSignal().color, [Validators.required]),
  });

  changeModel(): void {
    if (this.firstStepForm.get('model')?.valid){
      const model = this.models().find(m => m.code === this.firstStepForm.get('model')?.value);
      if (model) {
        this.teslaApiService.updateSelectedModel(model);
      }
      this.firstStepForm.get('color')?.setValue(this.selectedTeslaModelSignal().colors[0].code);
    }
  }

  onFormChange(): void {
    const currentConfiguredVehicle: ConfiguredVehicle = this.configuredVehicleSignal();
    const newConfigVehicle = {...currentConfiguredVehicle, model: this.firstStepForm.get('model')?.value, color: this.firstStepForm.get('color')?.valid ? this.firstStepForm.get('color')?.value : ''};
    this.teslaApiService.updateConfiguredVehicle(newConfigVehicle);
  }
}
