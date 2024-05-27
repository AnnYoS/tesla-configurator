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
  readonly models: Signal<Model[]> = toSignal(this.#teslaApiService.getModels(), {initialValue: []});
  readonly configuredVehicle: Signal<ConfiguredVehicle> = this.#teslaApiService.configuredVehicle;

  firstStepForm: FormGroup = new FormGroup({
    model: new FormControl(this.configuredVehicle().model.code, [Validators.required]),
    color: new FormControl(this.configuredVehicle().color.code, [Validators.required]),
  });

  changeModel(): void {
    if (this.firstStepForm.get('model')?.valid) {
      const model = this.models().find(m => m.code === this.firstStepForm.get('model')?.value);
      if (model) {
        this.#teslaApiService.updateSelectedModel(model);
        this.firstStepForm.get('color')?.setValue(this.configuredVehicle().model.colors[0].code);
        this.changeColor();
      }
    }
  }

  changeColor(): void {
    if (this.firstStepForm.get('color')?.valid) {
      const color = this.configuredVehicle().model.colors.find(c => c.code === this.firstStepForm.get('color')?.value);
      if (color) {
        this.#teslaApiService.updateSelectedColor(color);
      }
    }
  }
}
