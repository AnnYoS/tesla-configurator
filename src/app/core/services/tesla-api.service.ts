import {HttpClient} from "@angular/common/http";
import {inject, Injectable, signal, WritableSignal} from "@angular/core";
import {Observable} from "rxjs";
import {Model} from "../model/vehicle";
import {Configuration, MotorConfiguration} from "../model/configuration";
import {ConfiguredVehicle} from "../model/configured-vehicle";

@Injectable({
  providedIn: 'root'
})
export class TeslaApiService {

  configuredVehicleSignal: WritableSignal<ConfiguredVehicle> = signal(new ConfiguredVehicle());
  selectedModelSignal: WritableSignal<Model> = signal({ code: '', name: '', description: '', colors: [] });
  selectedMotorConfigSignal: WritableSignal<MotorConfiguration> = signal({id: 0, description: '', range: 0, speed: 0, price: 0});

  httpClient: HttpClient = inject(HttpClient);

  getModels(): Observable<Model[]> {
    return this.httpClient.get<Model[]>('/models');
  }

  getConfigurations(): Observable<Configuration> {
    return this.httpClient.get<Configuration>(`/options/${this.configuredVehicleSignal().model}`);
  }

  updateConfiguredVehicle(updateVehicle: ConfiguredVehicle): void {
    this.configuredVehicleSignal.set(updateVehicle);
  }

  updateSelectedModel(updateModel: Model): void {
    this.selectedModelSignal.set(updateModel);
  }

  updateMotorConfiguration(updateMotorConfiguration: MotorConfiguration): void {
    this.selectedMotorConfigSignal.set(updateMotorConfiguration);
  }
}
