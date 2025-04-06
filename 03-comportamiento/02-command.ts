/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Command {
  execute(): void;
};

class Light {
  turnOn(): void {
    console.log('%cLuz encedida', COLORS.yellow);
  }

  turnOff(): void {
    console.log('%cLuz apagada', COLORS.blue);
  }
}

class Fan {
  on(): void {
    console.log('%cVentilador encedido', COLORS.yellow);
  }

  off(): void {
    console.log('%cVentilador apagado', COLORS.blue);
  }
}

class LightOnCommand implements Command {
  constructor (private light: Light) {}
  
  execute(): void {
    this.light.turnOn();
  }
}

class LightOffCommand implements Command {
  constructor (private light: Light) {}
  
  execute(): void {
    this.light.turnOff();
  }
}

class FanOnCommand implements Command {
  constructor (private fan: Fan) {}
  
  execute(): void {
    this.fan.on();
  }
}

class FanOffCommand implements Command {
  constructor (private fan: Fan) {}
  
  execute(): void {
    this.fan.off();
  }
}

class RemoteControl {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command): void {
    this.commands[button] = command;
  }

  pressButton(button: string): void {
    if (this.commands[button]) {
      this.commands[button].execute();
      return;
    }

    console.log(`%cNo se ha asignado un comando para el boton ${button}`, COLORS.red);
  }
}

function main() {
  const remoteControl = new RemoteControl();

  const light = new Light();
  const fan = new Fan();

  const lightOnCommand = new LightOnCommand(light);
  const lightOffCommand = new LightOffCommand(light);

  const fantOnCommand = new FanOnCommand(fan);
  const fantOffCommand = new FanOffCommand(fan);

  remoteControl.setCommand('1', lightOnCommand);
  remoteControl.setCommand('2', lightOffCommand);
  remoteControl.setCommand('3', fantOnCommand);
  remoteControl.setCommand('4', fantOffCommand);

  let continueProgram = true;

  do {
    console.clear();
    const pressedButton = prompt(
      `Presiona un boton del contro:
        1. Encender luz
        2. Apagar luz
        3. Encender ventilador
        4. Apagar ventilador

        Boton:
      `) ?? '';

    remoteControl.pressButton(pressedButton);

    const continueProgramResponse = prompt(
      '\nDesea continuar? (y/n)'
    )?.toLowerCase();

    continueProgram = continueProgramResponse === 'n' ? false : true;
  } while(continueProgram);
};

main();