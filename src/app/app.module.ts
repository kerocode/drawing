import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DrawItComponent } from './draw-it/draw-it.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ChatComponent } from './chat/chat.component';
import { environment } from '../environments/environment';
import { WindowSizeService } from './services/window-size.service';
import { ReactiveFormsModule } from '@angular/forms';
import { JoinChatComponent } from './join-chat/join-chat.component';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
//app routes 
const appRoutes: Routes = [
  {
    path:'log-in',
    component: LogInComponent
  },
  {
    path:'sign-up',
    component: SignUpComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DrawItComponent,
    ChatComponent,
    JoinChatComponent,
    LogInComponent,
    SignUpComponent,
    HomePageComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ReactiveFormsModule
  ],
  providers: [WindowSizeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
