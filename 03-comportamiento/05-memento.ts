/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

class GameMemento {
  constructor(private level: number, private health: number, private position: string) {
    this.level = level;
    this.health = health;
    this.position = position;
  }

  getLevel() {
    return this.level;
  }

  getHealth() {
    return this.health;
  }

  getPosition() {
    return this.position;
  }
}

class Game {
  constructor(private level: number, private health: number, private position: string) {
    this.level = level;
    this.health = health;
    this.position = position;

    console.log(`
      Jugango en el nivel ${this.level}
      con ${this.health} de vida
      en la posición ${this.position}
    `)
  }

  save(): GameMemento {
    return new GameMemento(this.level, this.health, this.position);
  }

  play(level: number, health: number, position: string) {
    this.level = level;
    this.health = health;
    this.position = position;

    console.log(`
      Jugango en el nivel ${this.level}
      con ${this.health} de vida
      en la posición ${this.position}
    `);
  }

  restore(memento: GameMemento): void {
    this.level = memento.getLevel();
    this.health = memento.getHealth();
    this.position = memento.getPosition();

    console.log(`
      Restaurando el juego
      Jugango en el nivel ${this.level}
      con ${this.health} de vida
      en la posición ${this.position}
    `);
  }
}

class GameHistory {
  private mementos: GameMemento[] = [];

  push(memento: GameMemento) {
    this.mementos.push(memento);
  }

  pop(): GameMemento | null {
    return this.mementos.pop() ?? null;
  }
}

function main() {
  const game = new Game(1, 100, 'start');
  const history = new GameHistory();

  history.push(game.save());

  game.play(2, 90, 'middle');
  history.push(game.save());

  game.play(3, 80, 'end');
  history.push(game.save());

  game.restore(history.pop()!);
  game.restore(history.pop()!);
}

main();