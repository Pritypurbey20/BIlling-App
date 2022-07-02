import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginVerificationComponent } from './login-verification/login-verification.component';
import { BillComponent } from './bill/bill.component';
import { CustomerComponent } from './customer/customer.component';
import { AllbillsComponent } from './allbills/allbills.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { OverviewUserComponent } from './overview-user/overview-user.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuardGuard } from './services/auth-guard.guard';

const routes: Routes = [
  { path: "", redirectTo: 'register', pathMatch: 'full' },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "VerifyLoginOTP", component: LoginVerificationComponent },
  {
    path: "home", component: LayoutComponent, canActivate:[AuthGuardGuard] ,children: [
      { path: "", redirectTo: 'dashboard', pathMatch: 'full' },
      { path: "dashboard", component: DashboardComponent },
      { path: "customer", component: CustomerComponent },
      { path: "bill/:id", component: BillComponent },
      { path: "allbills/:id", component: AllbillsComponent },
      {
        path: "update", component: UpdateUserComponent, children:
          [{ path: "", redirectTo: 'profile', pathMatch: 'full' },
          { path: "edit", component: EditUserComponent },
          { path: "profile", component: OverviewUserComponent }]
      },
    ]
  },
  { path: "**", component: PageNotFoundComponentComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

