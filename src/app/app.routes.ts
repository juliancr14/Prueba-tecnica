import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PersonComponent } from './components/person/person.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "inicio", component: HomeComponent},
    {path: "person/:id", component: PersonComponent}
];
