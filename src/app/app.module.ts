import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
// import { registerLocaleData } from '@angular/common';
// import localeBr from '@angular/common/locales/br';
// import localeBrExtra from '@angular/common/locales/extra/br';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsService } from './core/settings/settings.service';

// registerLocaleData(localeBr, 'pt-BR', localeBrExtra);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'br' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
