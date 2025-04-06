/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

class DragonBalls {
  private static instance: DragonBalls;
  private ballsCollected: number;

  private constructor() {
    this.ballsCollected = 0;
  }

  public static getInstance(): DragonBalls {
    if (!DragonBalls.instance) {
      DragonBalls.instance = new DragonBalls();
      console.log('Las pelotas del dragon han sido creadas!');
    }

    return DragonBalls.instance;
  }

  collectBal(): void {
    if (this.ballsCollected < 7) {
      this.ballsCollected++;
      console.log(`Pelota recolectada. Total pelota ${this.ballsCollected}`);
      return;
    }

    console.log('Ya se han recolectado las 7 pelotas del dragon');
  }

  summoShenLong() {
    if (this.ballsCollected === 7) {
      console.log('Shenlog ha sido invocado, pide tu deseo');
      this.ballsCollected = 0;
      return;
    }

    console.log(`Aun faltan ${7 - this.ballsCollected} pelotas del dragon`);
    
  }
}

function main() {
  const gokuDragonBalls = DragonBalls.getInstance();
  
  gokuDragonBalls.collectBal();
  gokuDragonBalls.collectBal();
  gokuDragonBalls.collectBal();

  gokuDragonBalls.summoShenLong();

  const vegetaDragonBalls = DragonBalls.getInstance();

  vegetaDragonBalls.collectBal();
  vegetaDragonBalls.collectBal();
  vegetaDragonBalls.collectBal();
  vegetaDragonBalls.collectBal();

  gokuDragonBalls.summoShenLong();
}

main();