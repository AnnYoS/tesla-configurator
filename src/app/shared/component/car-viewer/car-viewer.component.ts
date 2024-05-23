import {Component, computed, inject, Signal} from '@angular/core';
import {TeslaApiService} from "../../../core/services/tesla-api.service";
import {ConfiguredVehicle} from "../../../core/model/configured-vehicle";

@Component({
  selector: 'car-viewer',
  standalone: true,
  imports: [],
  templateUrl: './car-viewer.component.html',
  styleUrl: './car-viewer.component.scss'
})
export class CarViewerComponent {

  private teslaApiService: TeslaApiService = inject(TeslaApiService);
  configuredVehicleSignal: Signal<ConfiguredVehicle> = this.teslaApiService.configuredVehicleSignal

  imagePath: Signal<string> = computed(() => `/assets/${this.configuredVehicleSignal().model}/${this.configuredVehicleSignal().color}.jpg`);
}
