/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */

import { COLORS } from "../helpers/colors.ts";

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): void;
};

abstract class BaseHandler implements Handler {
  private nextHandler?: Handler;

  setNext(handler: Handler): Handler {
   this.nextHandler = handler;
   return handler; 
  }

  handle(request: string): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }
};

// Soporte basico
class BasicSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === 'basico') {
      console.log('%cSoporte basico: Resolviendo problema basico', COLORS.cyan);
      return;
    }

    console.log('%cSoporte basico: Pasando problema a soporte avanzado', COLORS.blue);
    super.handle(request);
  }
};

class AdvancedSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === 'avanzado') {
      console.log('%cSoporte avanzado: Resolviendo problema avanzado', COLORS.yellow);
      return;
    }

    console.log('%cSoporte avanzado: Pasando problema a soporte experto', COLORS.orange);
    super.handle(request);
  }
};

class ExpertSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === 'experto') {
      console.log('%cSoporte experto: Resolviendo problema experto', COLORS.red);
      return;
    }

    console.log('%cSoporte experto: No se puede solucionar, finalizando', COLORS.purple);
  }
};

function main () {
  const basicSupport = new BasicSupport();
  const advancedSupport = new AdvancedSupport();
  const expertSupport = new ExpertSupport();

  basicSupport
    .setNext(advancedSupport)
    .setNext(expertSupport);

  basicSupport.handle('imposible'); 
}

main();