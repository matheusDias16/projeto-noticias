import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// MODULO DE API
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { CategoriaComponent } from './component/categoria/categoria.component';
import { NoticiaComponent } from './component/noticia/noticia.component';
import { LoginComponent } from './component/login/login.component';
import { CrudComponent } from './component/crud/crud.component';
import { CrudCategoriasComponent } from './component/crud-categorias/crud-categorias.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriaComponent,
    NoticiaComponent,
    LoginComponent,
    CrudComponent,
    CrudCategoriasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }