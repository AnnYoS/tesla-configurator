import {Component, inject, Signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TeslaApiService} from "../../core/services/tesla-api.service";
import {ConfiguredVehicle} from "../../core/model/configured-vehicle";
import {Configuration} from "../../core/model/configuration";
import {toSignal} from "@angular/core/rxjs-interop";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-second-step',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CurrencyPipe
  ],
  templateUrl: './second-step.component.html',
  styleUrl: './second-step.component.scss'
})
export class SecondStepComponent {

  #teslaApiService: TeslaApiService = inject(TeslaApiService);
  configuration: Signal<Configuration> = toSignal(this. #teslaApiService.getConfigurations(), {initialValue: {configs: [], towHitch: false, yoke: false}});
  configuredVehicleSignal: Signal<ConfiguredVehicle> = this. #teslaApiService.configuredVehicleSignal;

  secondStepForm: FormGroup = new FormGroup({
    config: new FormControl(this.configuredVehicleSignal().config.id, [Validators.required]),
    towHitch: new FormControl(this.configuredVehicleSignal().towHitch, [Validators.required]),
    yoke: new FormControl(this.configuredVehicleSignal().yoke, [Validators.required]),
  });

  changeConfig(): void {
    if (this.secondStepForm.get('config')?.valid){
      const motorConfig = this.configuration().configs.find(m => m.id === Number(this.secondStepForm.get('config')?.value));
      if (motorConfig) {
        this.#teslaApiService.updateMotorConfiguration(motorConfig);
      }
    }
  }

  changePackages(): void {
    if (this.secondStepForm.get('tow')?.valid || this.secondStepForm.get('yoke')?.valid) {
      const updateTow = this.secondStepForm.get('towHitch')?.value ? this.secondStepForm.get('towHitch')?.value : false;
      const updateYoke = this.secondStepForm.get('yoke')?.value ? this.secondStepForm.get('yoke')?.value : false;
      this.#teslaApiService.updateAdditionalPackages(updateTow, updateYoke);
    }
  }
}
