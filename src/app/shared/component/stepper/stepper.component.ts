import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'stepper-config',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent {

}
