import {Component, effect, inject, OnDestroy, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import { RouterLink } from '@angular/router';
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
export class StepperComponent implements OnInit, OnDestroy {

  private teslaApiService: TeslaApiService = inject(TeslaApiService);
  configuredVehicle: Signal<ConfiguredVehicle> = signal(this.teslaApiService.configuredVehicle.subscribe(res => {
    this.accessToStep2 = res.step1IsValid();
    this.accessToStep3 = res.step2IsValid();
  }));

  constructor() {

  }

  ngOnInit(): void {
    this.teslaApiService.configuredVehicle.subscribe(vehicle => {

    })
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  private canAccessSecondStep(vehicle: ConfiguredVehicle): boolean {
    return vehicle.model != '' && vehicle.color != '';
  }

  private canAccessThirdStep(vehicle: ConfiguredVehicle): boolean {
    return true;
  }
}

