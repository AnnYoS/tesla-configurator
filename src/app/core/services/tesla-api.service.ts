import {HttpClient} from "@angular/common/http";
import {inject, Injectable, signal, WritableSignal} from "@angular/core";
import {Observable} from "rxjs";
import {Color, Model} from "../model/vehicle";
import {Configuration, MotorConfiguration} from "../model/configuration";
import {ConfiguredVehicle, emptyMotorConfig} from "../model/configured-vehicle";

@Injectable({
  providedIn: 'root'
})
export class TeslaApiService {

  configuredVehicleSignal: WritableSignal<ConfiguredVehicle> = signal(new ConfiguredVehicle());

  httpClient: HttpClient = inject(HttpClient);

  getModels(): Observable<Model[]> {
    return this.httpClient.get<Model[]>('/models');
  }

  getConfigurations(): Observable<Configuration> {
    return this.httpClient.get<Configuration>(`/options/${this.configuredVehicleSignal().model.code}`);
  }

  updateSelectedModel(updatedModel: Model): void {
    const currentConfiguredVehicle = this.configuredVehicleSignal();
    const newConfiguredVehicle = {...currentConfiguredVehicle, model: updatedModel };
    this.configuredVehicleSignal.set(newConfiguredVehicle);
    this.updateMotorConfiguration(emptyMotorConfig);
    this.updateAdditionalPackages(false, false);
  }

  updateSelectedColor(updatedColor: Color): void {
    const currentConfiguredVehicle = this.configuredVehicleSignal();
    const newConfiguredVehicle = {...currentConfiguredVehicle, color: updatedColor };
    this.configuredVehicleSignal.set(newConfiguredVehicle);
  }

  updateMotorConfiguration(updateMotorConfiguration: MotorConfiguration): void {
    const currentConfiguredVehicle = this.configuredVehicleSignal();
    const newConfiguredVehicle = {...currentConfiguredVehicle, config: updateMotorConfiguration };
    this.configuredVehicleSignal.set(newConfiguredVehicle);
  }

  updateAdditionalPackages(updateTow: boolean, updateYoke: boolean): void {
    const currentConfiguredVehicle = this.configuredVehicleSignal();
    const newConfiguredVehicle = {...currentConfiguredVehicle, tow: updateTow, yoke: updateYoke };
    this.configuredVehicleSignal.set(newConfiguredVehicle);
  }
}
