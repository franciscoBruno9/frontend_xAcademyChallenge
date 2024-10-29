import { Routes } from '@angular/router';
import { CreatePlayerComponent } from './views/create-player/create-player.component';
import { UpdatePlayerComponent } from './views/update-player/update-player.component';
import { SearchPlayerComponent } from './views/search-player/search-player.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';

export const routes: Routes = [
    {
        path: 'landing',
        component: LandingPageComponent
    },
    {
        path: 'create',
        component: CreatePlayerComponent
    },
    {
        path: 'update',
        component: UpdatePlayerComponent
    },
    {
        path: 'search',
        component: SearchPlayerComponent
    },
    {
        path:'', redirectTo:'landing', pathMatch:'full'
    },
    {
        path:'**', component: LandingPageComponent  
    }
];
