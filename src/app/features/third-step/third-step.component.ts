import {Component, inject, Signal} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfiguredVehicle} from "../../core/model/configured-vehicle";
import {Color, Model} from "../../core/model/vehicle";
import {TeslaApiService} from "../../core/services/tesla-api.service";
import {MotorConfiguration} from "../../core/model/configuration";

@Component({
  selector: 'app-third-step',
  standalone: true,
  imports: [
    CurrencyPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './third-step.component.html',
  styleUrl: './third-step.component.scss'
})
export class ThirdStepComponent {

  #teslaApiService: TeslaApiService = inject(TeslaApiService);

  configuredVehicleSignal: Signal<ConfiguredVehicle> = this.#teslaApiService.configuredVehicleSignal;
}
