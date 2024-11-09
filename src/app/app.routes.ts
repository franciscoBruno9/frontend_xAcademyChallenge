import { Routes } from '@angular/router';
import { CreatePlayerComponent } from './views/create-player/create-player.component';
import { UpdatePlayerComponent } from './views/update-player/update-player.component';
import { SearchPlayerComponent } from './views/search-player/search-player.component';
import { LoginComponent } from './views/login-user/login-user.component';
import { UploadComponent } from './core/upload/upload.component';
import { RegisterUserComponent } from './views/register-user/register-user.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'register',
        component: RegisterUserComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'search',
        component: SearchPlayerComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'create',
        component: CreatePlayerComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'update/:id',
        component: UpdatePlayerComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'upload',
        component: UploadComponent,
        
    },
    {
        path:'', 
        redirectTo:'login', 
        pathMatch:'full'
    },
    {
        path:'**', component: LoginComponent
    }
];
