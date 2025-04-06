/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */


class Projector {
  turnOn() {
    console.log('Proyector encedido');
  }

  turnOff() {
    console.log('Proyector apago');
  }
}

class SoundSystem {
  on() {
    console.log('Sistema de sonido encendido');
  }

  off() {
    console.log('Sistema de sonido apago');
  }
}

class VideoPlayer {
  on() {
    console.log('Video player encendido');
  }

  play(movie: string) {
    console.log(`Reproduciendo ${movie}`);
  }

  stop() {
    console.log('Pelicula detenida');
  }

  off() {
    console.log('Video player apagado');
  }
}

class PopcornMaker {
  poppingPopcorn() {
    console.log('Haciendo palomitas');
  }

  turnOffPoppingPopcorn() {
    console.log('Deteniendo hecha de palomitas');
  }
}

interface HomeTheaterFacadeOptions {
  projector: Projector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popcornMaker: PopcornMaker;
}

class HomeTheaterFacade {
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcornMaker: PopcornMaker;

  constructor({
    popcornMaker,
    projector,
    soundSystem,
    videoPlayer,
  }: HomeTheaterFacadeOptions) {
    this.projector = projector;
    this.soundSystem = soundSystem;
    this.videoPlayer = videoPlayer;
    this.popcornMaker = popcornMaker
  }

  watchMovie(movie: string): void {
    console.log(`Preparando para ver pelicula ${movie}`);

    this.projector.turnOn();
    this.soundSystem.on();
    this.popcornMaker.poppingPopcorn();
    this.videoPlayer.on();
    this.videoPlayer.play(movie);

    console.log('Disfrute la pelicula!'); 
  }

  endWatchingMovie():void {
    console.log(`Preparando para detener la pelicula`);

    this.projector.turnOff();
    this.soundSystem.off();
    this.popcornMaker.turnOffPoppingPopcorn();
    this.videoPlayer.stop();
    this.videoPlayer.off();

    console.log('Finalizo pelicula!'); 
  }
}

function main() {
  const projector = new Projector();
  const soundSystem = new SoundSystem();
  const popcornMaker = new PopcornMaker();
  const videoPlayer = new VideoPlayer();

  const homeTheaterFacadeOptions: HomeTheaterFacadeOptions = {
    projector,
    soundSystem,
    popcornMaker,
    videoPlayer,
  }

  const homeTheater = new HomeTheaterFacade(homeTheaterFacadeOptions);
  homeTheater.watchMovie('3 dias detras de un morrito');
}

main();