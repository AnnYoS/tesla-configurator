import {HttpClient} from "@angular/common/http";
import {inject, Injectable, signal, WritableSignal} from "@angular/core";
import {Observable} from "rxjs";
import {Color, Model} from "../model/vehicle-model";
import {Configuration, MotorConfiguration} from "../model/configuration";
import {ConfiguredVehicle, emptyMotorConfig} from "../model/configured-vehicle";

@Injectable({
  providedIn: 'root'
})
export class TeslaApiService {

  httpClient: HttpClient = inject(HttpClient);
  configuredVehicle: WritableSignal<ConfiguredVehicle> = signal(new ConfiguredVehicle());

  getModels(): Observable<Model[]> {
    return this.httpClient.get<Model[]>('/models');
  }

  getConfigurations(): Observable<Configuration> {
    return this.httpClient.get<Configuration>(`/options/${this.configuredVehicle().model.code}`);
  }

  updateSelectedModel(updatedModel: Model): void {
    const currentConfiguredVehicle = this.configuredVehicle();
    const newConfiguredVehicle = {...currentConfiguredVehicle, model: updatedModel };
    this.configuredVehicle.set(newConfiguredVehicle);
    this.updateMotorConfiguration(emptyMotorConfig);
    this.updateAdditionalPackages(false, false);
  }

  updateSelectedColor(updatedColor: Color): void {
    const currentConfiguredVehicle = this.configuredVehicle();
    const newConfiguredVehicle = {...currentConfiguredVehicle, color: updatedColor };
    this.configuredVehicle.set(newConfiguredVehicle);
  }

  updateMotorConfiguration(updateMotorConfiguration: MotorConfiguration): void {
    const currentConfiguredVehicle = this.configuredVehicle();
    const newConfiguredVehicle = {...currentConfiguredVehicle, config: updateMotorConfiguration };
    this.configuredVehicle.set(newConfiguredVehicle);
  }

  updateAdditionalPackages(updateTow: boolean, updateYoke: boolean): void {
    const currentConfiguredVehicle = this.configuredVehicle();
    const newConfiguredVehicle = {...currentConfiguredVehicle, towHitch: updateTow, yoke: updateYoke };
    this.configuredVehicle.set(newConfiguredVehicle);
  }
}
