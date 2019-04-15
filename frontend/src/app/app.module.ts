import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// tslint:disable-next-line:max-line-length
import { MatToolbarModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule, MatSelectModule, MatMenuModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from './shared/shared.module';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';

@NgModule({
  declarations: [
		AppComponent,
		LoginComponent,
		LandingComponent,
		RegisterComponent,
		NavbarComponent
  ],
  imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		HttpClientModule,
		CookieModule.forRoot(),
		AppRoutingModule,
		MatToolbarModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatTableModule,
		MatSelectModule,
		MatMenuModule,
		SharedModule
  ],
  exports: [
  ],
  providers: [
		AuthService,
		AuthGuard
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
