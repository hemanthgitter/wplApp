import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ControlMessagesComponent } from './control-messages/control-messages.component';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/guards/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';

@NgModule({
  declarations: [
		AppComponent,
		LoginComponent,
		LandingComponent,
		RegisterComponent,
		NavbarComponent,
		ControlMessagesComponent
  ],
  imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AppRoutingModule,
		MatToolbarModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule
  ],
  providers: [
		AuthService,
		AuthGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: JwtInterceptor,
			multi: true
		}
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
