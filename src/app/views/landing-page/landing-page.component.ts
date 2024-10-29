import { Component } from '@angular/core';
import { CreatePlayerComponent } from '../create-player/create-player.component';
import { UpdatePlayerComponent } from '../update-player/update-player.component';
import { SearchPlayerComponent } from '../search-player/search-player.component';
import { Option } from '../../core/model/option.model';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CreatePlayerComponent,
    UpdatePlayerComponent,
    SearchPlayerComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  options: Array<Option> = [
    { text: 'Crear Jugador/a', route:'/' },
    { text: 'Modificar Jugador/a', route:'/' },
    { text: 'Buscar Jugador/a', route:'/' }
  ]
}
