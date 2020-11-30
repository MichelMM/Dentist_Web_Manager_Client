import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SocketIoService } from './services/socket-io.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dentist-Web-Manager-Client';

  constructor(private socket: SocketIoService, private authService: AuthService) {
    if (this.authService.isLoggedIn()) {
      this.socket.connect();
    }
  }
}
