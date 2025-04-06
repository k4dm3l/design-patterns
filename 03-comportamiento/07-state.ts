/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */
import { sleep } from '../helpers/sleep.ts';

interface State {
  name: string;

  insertCoin(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

class VendingMachine {
  private state: State;

  constructor() {
    this.state = new WaitingForMoneyState(this);
  }

  setState(state: State) {
    this.state = state;
  }

  insertCoin() {
    this.state.insertCoin();
  }

  selectProduct() {
    this.state.selectProduct();
  }

  dispenseProduct() {
    this.state.dispenseProduct();
  }

  getStateName(): string {
    return this.state.name;
  }
}

class WaitingForMoneyState implements State {
  public name = "Waiting for money";
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertCoin() {
    console.log("Money inserted");
    this.vendingMachine.setState(new ProductSelectedState(this.vendingMachine));
  }

  selectProduct() {
    console.log("Please insert money first");
  }

  dispenseProduct() {
    console.log("Please insert money first");
  }
}

class ProductSelectedState implements State {
  public name = "Product selected";
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertCoin() {
    console.log("Money already inserted");
  }

  selectProduct() {
    console.log("Product already selected");
    this.vendingMachine.setState(new ProductDispensedState(this.vendingMachine));
  }

  dispenseProduct() {
    console.log("Product not selected yet before dispense the product");
  }
}

class ProductDispensedState implements State {
  public name = "Product dispensed";
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertCoin() {
    console.log("Please wait for the product to be dispensed");
  }

  selectProduct() {
    console.log("Please wait for the product to be dispensed");
  }

  dispenseProduct() {
    console.log("Product dispensed, please insert a coin");
    this.vendingMachine.setState(new WaitingForMoneyState(this.vendingMachine));
  }
}

async function main() {
  const vendingMachine = new VendingMachine();

  let selectedOption: string | null = '4';

  do {
    console.clear();
    console.log("\nCurrent state:", vendingMachine.getStateName());
    console.log("1. Insert coin");
    console.log("2. Select product");
    console.log("3. Dispense product");
    console.log("4. Exit");

    selectedOption = prompt("Select an option:");

    switch(selectedOption) {
      case '1':
        console.log("Current state:", vendingMachine.getStateName());
        vendingMachine.insertCoin();
        break
      case '2':
        console.log("Current state:", vendingMachine.getStateName());
        vendingMachine.selectProduct();
        break
      case '3':
        console.log("Current state:", vendingMachine.getStateName());
        vendingMachine.dispenseProduct();
        break
      case '4':
        console.log("Exiting...");
        break
      default:
        console.log("Invalid option");
    }

    await sleep(3000);

  } while (selectedOption !== '4');
}

main();