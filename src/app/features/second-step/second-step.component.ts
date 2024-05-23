import {Component, inject, Signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TeslaApiService} from "../../core/services/tesla-api.service";
import {ConfiguredVehicle} from "../../core/model/configured-vehicle";
import {Configuration} from "../../core/model/configuration";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-second-step',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './second-step.component.html',
  styleUrl: './second-step.component.scss'
})
export class SecondStepComponent {

  private teslaApiService: TeslaApiService = inject(TeslaApiService);
  configuration: Signal<Configuration> = toSignal(this.teslaApiService.getConfigurations(), {initialValue: {configs: [], towHitch: false, yoke: false}})
  configuredVehicleSignal: Signal<ConfiguredVehicle> = this.teslaApiService.configuredVehicleSignal;

  secondStepForm: FormGroup = new FormGroup({
    config: new FormControl(this.configuredVehicleSignal().config, [Validators.required]),

  });

  onFormChange(): void {
    const currentConfiguredVehicle = this.configuredVehicleSignal();
    const newConfigVehicle = {...currentConfiguredVehicle, config: this.secondStepForm.get('config')?.value};
    this.teslaApiService.updateConfiguredVehicle(newConfigVehicle);
  }
}
