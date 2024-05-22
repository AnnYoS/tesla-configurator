import {HttpClient} from "@angular/common/http";
import {effect, inject, Injectable, signal, Signal, WritableSignal} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Model} from "../model/vehicle";
import {Configuration} from "../model/configuration";
import {ConfiguredVehicle} from "../model/configured-vehicle";
import {toSignal} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class TeslaApiService {

  configuredVehicle: BehaviorSubject<ConfiguredVehicle> = new BehaviorSubject<ConfiguredVehicle>(new ConfiguredVehicle());
  vehicleSignal: WritableSignal<ConfiguredVehicle> = signal(new ConfiguredVehicle());

  httpClient: HttpClient = inject(HttpClient);

  getModels(): Observable<Model[]> {
    return this.httpClient.get<Model[]>('/models');
  }

  getOptions(option: string): Observable<Configuration[]> {
    return this.httpClient.get<Configuration[]>(`/options/${option}`);
  }
}
