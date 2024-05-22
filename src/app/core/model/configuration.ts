export interface Configuration {
  configs: MotorConfigurations[];
  towHitch: boolean;
  yoke: boolean;
}

export interface MotorConfigurations {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
}
