import {FrameworkConfiguration} from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
     PLATFORM.moduleName('./hello'),
     PLATFORM.moduleName('./host'),
     PLATFORM.moduleName('./make-me-red'),
  ]);
}
