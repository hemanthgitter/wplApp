import { LandingComponent } from './landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		component: LandingComponent,
		canActivate: [AuthGuard],
		data: {
			expectedRole: []
		}
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: 'users',
		loadChildren: './admin/admin.module#AdminModule',
		canActivate: [AuthGuard],
		data: {
			expectedRole: ['admin']
		}
	},
	{
		path: 'seller',
		loadChildren: './seller/seller.module#SellerModule',
		canActivate: [AuthGuard],
		data: {
			expectedRole: ['seller']
		}
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
