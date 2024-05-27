import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {StepperComponent} from "./features/stepper/stepper.component";
import {RouterOutlet} from "@angular/router";
import {CarViewerComponent} from "./features/car-viewer/car-viewer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe, JsonPipe, StepperComponent, RouterOutlet, CarViewerComponent
  ],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = 'Tesla Configurator';
}
