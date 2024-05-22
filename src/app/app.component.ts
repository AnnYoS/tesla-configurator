import {Component, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {StepperComponent} from "./shared/component/stepper/stepper.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe, JsonPipe, StepperComponent, RouterOutlet
  ],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = 'Tesla Configurator';
}
