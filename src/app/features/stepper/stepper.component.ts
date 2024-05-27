import {Component, inject, Signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TeslaApiService} from "../../core/services/tesla-api.service";
import {ConfiguredVehicle, emptyCarModel, emptyColor, emptyMotorConfig} from "../../core/model/configured-vehicle";

@Component({
  selector: 'tesla-stepper',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent {

  #teslaApiService: TeslaApiService = inject(TeslaApiService);
  readonly configuredVehicle: Signal<ConfiguredVehicle> = this.#teslaApiService.configuredVehicle;

  canAccessSecondStep(): boolean {
    return this.configuredVehicle().model === emptyCarModel && this.configuredVehicle().color === emptyColor;
  }

  canAccessThirdStep(): boolean {
    return this.configuredVehicle().config === emptyMotorConfig;
  }
}

