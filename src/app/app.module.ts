import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HydrationService } from "./hydration.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    RouterModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
  ],
  exports: [
    RouterModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (hydrate: HydrationService) => hydrate.initializeApp,
    multi: true,
    deps: [HydrationService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
