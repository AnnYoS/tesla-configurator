export interface Configuration {
  configs: MotorConfiguration[];
  towHitch: boolean;
  yoke: boolean;
}

export interface MotorConfiguration {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
}
