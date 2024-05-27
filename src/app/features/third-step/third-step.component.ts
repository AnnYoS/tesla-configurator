import {Component, inject, Signal} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfiguredVehicle} from "../../core/model/configured-vehicle";
import {TeslaApiService} from "../../core/services/tesla-api.service";

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

  getTotalPrice(): number {
    let total = this.configuredVehicleSignal().config.price;
    if (this.configuredVehicleSignal().color.price != 0) {
      total += this.configuredVehicleSignal().color.price;
    }
    if (this.configuredVehicleSignal().towHitch) {
      total += 1000;
    }
    if (this.configuredVehicleSignal().yoke) {
      total += 1000;
    }
    return total;
  }
}
