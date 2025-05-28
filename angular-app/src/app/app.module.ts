import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AppComponent  // Import the standalone root component here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
