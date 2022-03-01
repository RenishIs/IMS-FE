import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuDetail, Menus } from 'src/models/menu';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menusArray: MenuDetail[] = [];
  localStorageToken: any;

  constructor(
    private httpClient: HttpClient,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.localStorageBehaviour.subscribe(res => {
      this.getAllMenu();
      this.localStorageToken = this.authService.getJwtToken();
    });
  }

  getAllMenu() {
    this.httpClient.get('/assets/menu.json').subscribe((menu: Menus | any) => {
      this.menusArray = menu[this.authService.getUserRole()]
    });
  }

  logout() {
    this.authService.signOut();
    this.authService.localStorageBehaviour.next(this.authService.getJwtToken());
  }
}
