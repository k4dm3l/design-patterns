/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */


interface Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void;
  visitHauntedHouse(hauntedHouse: HauntedHouse): void;
  visitFerrisWheel(ferrisWheel: FerrisWheel): void;
}

interface Attraction {
  accept(visitor: Visitor): void;
  getPrice(): number;
}

class RollerCoaster implements Attraction {
  private price: number = 50;
  
  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitRollerCoaster(this);
  }
}

class HauntedHouse implements Attraction {
  private price: number = 40;
  
  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitHauntedHouse(this);
  }
}

class FerrisWheel implements Attraction {
  private price: number = 40;
  
  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitFerrisWheel(this);
  }
}

// Visitors
class ChildVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(`Child: Roller coaster price is $${rollerCoaster.getPrice() * 0.5}`);
  }

  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(`Child: Haunted house price is ${hauntedHouse.getPrice() * 0.7}`);
  }

  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(`Child: Ferris wheel price is ${ferrisWheel.getPrice() * 0.6}`);
  }
}

class AdultVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(`Adult: Roller coaster price is $${rollerCoaster.getPrice()}`);
  }

  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(`Adult: Haunted house price is ${hauntedHouse.getPrice()}`);
  }

  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(`Adult: Ferris wheel price is ${ferrisWheel.getPrice()}`);
  }
}

class SeniorVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(`Senior: Roller coaster price is $${rollerCoaster.getPrice() * 0.8}`);
  }

  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(`Senior: Haunted house price is ${hauntedHouse.getPrice() * 0.9}`);
  }

  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(`Senior: Ferris wheel price is ${ferrisWheel.getPrice() * 0.7}`);
  }
}


function main () {
  const rollerCoaster = new RollerCoaster();
  const hauntedHouse = new HauntedHouse();
  const ferrisWheel = new FerrisWheel();

  const attractions: Attraction[] = [
    rollerCoaster,
    hauntedHouse,
    ferrisWheel,
  ];

  console.log('--- Prices ---\n');
  console.log(`Roller Coaster: ${rollerCoaster.getPrice()}`);
  console.log(`Haunted House: ${hauntedHouse.getPrice()}`);
  console.log(`Ferris Wheel: ${ferrisWheel.getPrice()} \n`);

  console.log('--- Visitors ---\n');
  console.log('--- Child ---');
  const childVisitor = new ChildVisitor();

  attractions.forEach(attraction => {
    attraction.accept(childVisitor);
  });

  console.log('--- Adult ---');
  const adultVisitor = new AdultVisitor();

  attractions.forEach(attraction => {
    attraction.accept(adultVisitor);
  });

  console.log('--- Senior ---');
  const seniorVisitor = new SeniorVisitor();

  attractions.forEach(attraction => {
    attraction.accept(seniorVisitor);
  });
}

main();