import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {  FormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';


import 'hammerjs';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';


import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService} from './services/leader.service';
import { ProcessHttpmsgService } from './services/process-httpmsg.service';

import { enterView } from '@angular/core/src/render3/instructions';
import { SearchPipe } from './search.pipe';
import { FeedBackService } from './services/feed-back.service';
import { HighlightDirective } from './directives/highlight.directive';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    SearchPipe,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDJ4XP-MD4jOncSZXyJC8_Jyk7jKHRgIAU'
    })
  ],
  entryComponents: [

  ],
  providers: [DishService, PromotionService, LeaderService, ProcessHttpmsgService, FeedBackService],
  bootstrap: [AppComponent]
})
export class AppModule { }
