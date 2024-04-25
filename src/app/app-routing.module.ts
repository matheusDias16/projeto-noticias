import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CategoriaComponent } from './component/categoria/categoria.component';
import { NoticiaComponent } from './component/noticia/noticia.component';
import { LoginComponent } from './component/login/login.component';
import { CrudComponent } from './component/crud/crud.component';
import { crudGuard } from './guard/crud.guard';
import { CrudCategoriasComponent } from './component/crud-categorias/crud-categorias.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categoria/:id', component: CategoriaComponent },
  { path: 'noticia/:id', component: NoticiaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'crud', component: CrudComponent, canActivate: [crudGuard] },
  { path: 'crud-categorias', component: CrudCategoriasComponent, canActivate: [crudGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
