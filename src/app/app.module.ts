import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { RippleComponent } from './components/ripple/ripple.component';


@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    RippleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule { }
