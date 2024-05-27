import {Component, inject, Signal} from '@angular/core';
import {TeslaApiService} from "../../core/services/tesla-api.service";
import {Model} from "../../core/model/vehicle-model";
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

  #teslaApiService: TeslaApiService = inject(TeslaApiService);
  readonly modelsSignal: Signal<Model[]> = toSignal(this.#teslaApiService.getModels(), {initialValue: []});
  readonly configuredVehicleSignal: Signal<ConfiguredVehicle> = this.#teslaApiService.configuredVehicleSignal;

  firstStepForm: FormGroup = new FormGroup({
    model: new FormControl(this.configuredVehicleSignal().model.code, [Validators.required]),
    color: new FormControl(this.configuredVehicleSignal().color.code, [Validators.required]),
  });

  changeModel(): void {
    if (this.firstStepForm.get('model')?.valid) {
      const model = this.modelsSignal().find(m => m.code === this.firstStepForm.get('model')?.value);
      if (model) {
        this.#teslaApiService.updateSelectedModel(model);
        this.firstStepForm.get('color')?.setValue(this.configuredVehicleSignal().model.colors[0].code);
        this.changeColor();
      }
    }
  }

  changeColor(): void {
    if (this.firstStepForm.get('color')?.valid) {
      const color = this.configuredVehicleSignal().model.colors.find(c => c.code === this.firstStepForm.get('color')?.value);
      if (color) {
        this.#teslaApiService.updateSelectedColor(color);
      }
    }
  }
}
