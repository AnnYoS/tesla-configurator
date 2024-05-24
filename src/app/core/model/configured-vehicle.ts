import {Color, Model} from "./vehicle";
import {MotorConfiguration} from "./configuration";

export class ConfiguredVehicle {
  model:  Model = emptyCarModel;
  color: Color = emptyColor;
  config: MotorConfiguration = emptyMotorConfig;
  towHitch: boolean = false;
  yoke: boolean = false;
}

export const emptyCarModel: Model = { code: '', description: '', colors: [] };
export const emptyColor: Color = { code: '', description: '', price: 0 };
export const emptyMotorConfig: MotorConfiguration = { id: 0, description: '', range: 0, speed: 0, price: 0 };
