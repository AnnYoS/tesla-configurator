import {Component, inject, Signal} from '@angular/core';
import {TeslaApiService} from "../../core/services/tesla-api.service";
import {Model} from "../../core/model/vehicle";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-first-step',
  standalone: true,
  imports: [
  ],
  templateUrl: './first-step.component.html',
  styleUrl: './first-step.component.scss'
})
export class FirstStepComponent {

  private teslaApiService: TeslaApiService = inject(TeslaApiService);

  models: Signal<Model[]> = toSignal(this.teslaApiService.getModels(), {initialValue: []})
}
