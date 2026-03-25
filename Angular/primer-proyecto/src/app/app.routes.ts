import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'about', component: AboutComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'users/:id', component: UserDetailComponent }
];
