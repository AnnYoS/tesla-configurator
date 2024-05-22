import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Model } from "../model/vehicle";

@Injectable({
  providedIn: 'root'
})
export class TeslaApiService {

  httpClient: HttpClient = inject(HttpClient);

  getModels(): Observable<Model[]> {
    return this.httpClient.get<Model[]>('/models');
  }

}
