import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
// import { registerLocaleData } from '@angular/common';
// import localeBr from '@angular/common/locales/br';
// import localeBrExtra from '@angular/common/locales/extra/br';
import { AngularFireModule } from '@angular/fire';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsService } from './core/settings/settings.service';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';

// registerLocaleData(localeBr, 'pt-BR', localeBrExtra);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    MatSnackBarModule,

    CoreModule,

    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
