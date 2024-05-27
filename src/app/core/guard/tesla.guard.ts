import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TeslaApiService} from "../services/tesla-api.service";
import {emptyCarModel, emptyMotorConfig} from "../model/configured-vehicle";

export const secondStepConfigurationGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  if (inject(TeslaApiService).configuredVehicle().model === emptyCarModel) {
    router.navigate(['/first-step']);
  }
  return true;
};

export const thirdStepConfigurationGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let teslaApiService = inject(TeslaApiService);
  if ((teslaApiService.configuredVehicle().model === emptyCarModel) || (teslaApiService.configuredVehicle().config === emptyMotorConfig)) {
    router.navigate(['/first-step']);
  }
  return true;
};
