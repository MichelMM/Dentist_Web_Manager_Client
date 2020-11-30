import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  socketClient;

  constructor() { }

  connect() {
    this.socketClient = socketIo.io(environment.SOCKET_URL);
  }

  on(eventName, callback) {
    this.socketClient.on(eventName, callback);
  }

  emit(eventName, data) {
    this.socketClient.emit(eventName, data);
  }

  disconnect() {
    if (this.socketClient && this.socketClient.connected) {
      this.socketClient.disconnect();
    }
  }
}
