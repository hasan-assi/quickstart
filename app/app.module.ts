import { NgModule } from '@angular/core';
import {DndModule} from 'ng2-dnd';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { Data } from './service/data.service';

@NgModule({
  imports:      [ BrowserModule, DndModule.forRoot() ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [Data]
})
export class AppModule { }
