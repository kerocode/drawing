import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
@NgModule({
  declarations: [
    AppComponent,
    DrawItComponent,
    ChatComponent,
    JoinChatComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
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
