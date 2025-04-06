/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */

import { COLORS } from "../helpers/colors.ts";

class ChatRoom {
  private users: User[] = [];
  private title: string;

  constructor(title: string) {
    this.title = title;
  }

  addUser(user: User) {
    this.users.push(user);
  }

  sendMessage(sender: User, message: string): void {
    const usersToSend = this.users.filter(user => user !== sender);
    
    for (const user of usersToSend) {
      user.receiveMessage(sender, message);
    }
  }
}


class User {
  private username: string;
  private chatroom: ChatRoom;

  constructor(username: string, chatroom: ChatRoom) {
    this.username = username;
    this.chatroom = chatroom;

    chatroom.addUser(this);
  }

  sendMessage(message: string): void {
    console.log(
      `\n\n\n%c${this.username}: %c${message}`,
      COLORS.blue,
      COLORS.white,
    );

    this.chatroom.sendMessage(this, message);
  }

  receiveMessage(sender: User, message: string): void {
    console.log(
      `\n%c${sender.username} => %c${this.username}: %c${message}`,
      COLORS.green,
      COLORS.blue,
      COLORS.white,
    );
  }
}

function main() {
  const chatroom = new ChatRoom('Trabajo');

  const user1 = new User('Lorena', chatroom);
  const user2 = new User('Camilo', chatroom);
  const user3 = new User('Rio', chatroom);

  user1.sendMessage('Hola!');
  user2.sendMessage('Hola Lorena!');
  user3.sendMessage('Hola :D!');
};

main();