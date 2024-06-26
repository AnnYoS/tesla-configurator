import {Component, computed, inject, Signal} from '@angular/core';
import {TeslaApiService} from '../../core/services/tesla-api.service';
import {ConfiguredVehicle, emptyCarModel, emptyColor} from '../../core/model/configured-vehicle';

@Component({
  selector: 'tesla-viewer',
  standalone: true,
  imports: [],
  templateUrl: './car-viewer.component.html',
  styleUrl: './car-viewer.component.scss'
})
export class CarViewerComponent {

  #teslaApiService: TeslaApiService = inject(TeslaApiService);
  readonly configuredVehicle: Signal<ConfiguredVehicle> = this.#teslaApiService.configuredVehicle

  imagePath: Signal<string> = computed(() => `https://interstate21.com/tesla-app/images/${this.configuredVehicle().model.code}/${this.configuredVehicle().color.code}.jpg`);
  protected readonly emptyCarModel = emptyCarModel;
  protected readonly emptyColor = emptyColor;
}
