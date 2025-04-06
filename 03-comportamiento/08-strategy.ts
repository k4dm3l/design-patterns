/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

export interface MovementStrategy {
  move(): void;
}

// Estrategia #1 - Rapida pero costosa
class SwingFast implements MovementStrategy {
  move(): void {
    console.log("The duck swing fast over the water");
  }
}

//Estrategia #2 - Rapida pero no tan costos
class FlyOverWater implements MovementStrategy {
  move(): void {
    console.log("The duck fly over the water");
  }
}

//Estrategia #3 - Camina pero no tan rapido
class Walk implements MovementStrategy {
  move(): void {
    console.log("The duck walk over the field");
  }
}

// Consumidor de estategias
class Duck {
  private movementStrategy: MovementStrategy;
  private name: string;

  constructor(name: string, movementStrategy: MovementStrategy) {
    this.name = name;
    this.movementStrategy = movementStrategy;

    console.log(`I'm ${this.name} the duck! Ready for the race!`);
  }

  setMovementStrategy(strategy: MovementStrategy): void {
    this.movementStrategy = strategy;
  }

  performMovement(): void {
    console.log(`I'm ${this.name} the duck! Let's move!`);
    this.movementStrategy.move();
  }
}

function main(): void {
  const pato1 = new Duck("Pato1", new FlyOverWater());
  const pato2 = new Duck("Pato2", new Walk());
  const pato3 = new Duck("Pato3", new SwingFast());
  
  console.log("The race begins!");

  pato1.performMovement();
  pato2.performMovement();
  pato3.performMovement();

  pato3.setMovementStrategy(new Walk());
  pato3.performMovement();
}

main();