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
  readonly configuredVehicle: Signal<ConfiguredVehicle> = this.#teslaApiService.configuredVehicle;

  getTotalPrice(): number {
    let total = this.configuredVehicle().config.price;
    if (this.configuredVehicle().color.price != 0) {
      total += this.configuredVehicle().color.price;
    }
    if (this.configuredVehicle().towHitch) {
      total += 1000;
    }
    if (this.configuredVehicle().yoke) {
      total += 1000;
    }
    return total;
  }
}
