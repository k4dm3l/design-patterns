/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

interface Observer {
  notify(videoTitle: string): void;
}

class YoutubeChannel {
  private subscribers: Observer[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  subscribe(observer: Observer): void {
    this.subscribers.push(observer);
    console.log(`New subscriber: ${observer.constructor.name} to channel ${this.name}`);
  }

  unsubscribe(observer: Observer): void {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== observer);
    console.log(`Unsubscriber: ${observer.constructor.name} to channel ${this.name}`);
  }

  uploadVideo(videoTitle: string): void {
    console.log(`New video uploaded: ${videoTitle} - ${this.name}`);
    for (const subscriber of this.subscribers) {
      subscriber.notify(videoTitle);
    }
  }
}

class Suscriber implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  notify(videoTitle: string): void {
    console.log(`${this.name} received notification: New video uploaded - ${videoTitle}`);
  }
}

function main() {
  const channel = new YoutubeChannel("My Channel");

  const subscriber1 = new Suscriber("Subscriber 1");
  const subscriber2 = new Suscriber("Subscriber 2");
  const subscriber3 = new Suscriber("Subscriber 3");

  channel.subscribe(subscriber1);
  channel.subscribe(subscriber2);

  channel.uploadVideo("My First Video");

  channel.subscribe(subscriber3);

  channel.uploadVideo("My Second Video");

  channel.unsubscribe(subscriber2);

  channel.uploadVideo("My Third Video");
}

main();