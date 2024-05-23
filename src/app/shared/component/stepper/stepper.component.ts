import {Component, inject, Signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TeslaApiService} from "../../../core/services/tesla-api.service";
import {ConfiguredVehicle} from "../../../core/model/configured-vehicle";

@Component({
  selector: 'stepper-config',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent {

  private teslaApiService: TeslaApiService = inject(TeslaApiService);

  configuredVehicle: Signal<ConfiguredVehicle> = this.teslaApiService.configuredVehicleSignal;

  canAccessSecondStep(): boolean {
    return this.configuredVehicle().model == '' && this.configuredVehicle().color == '';
  }

  canAccessThirdStep(): boolean {
    return this.configuredVehicle().config == '';
  }
}

