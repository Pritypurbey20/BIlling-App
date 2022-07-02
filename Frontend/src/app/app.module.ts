import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service'
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginVerificationComponent } from './login-verification/login-verification.component';
import { CustomerComponent } from './customer/customer.component';
import { BillComponent } from './bill/bill.component';
import { AllbillsComponent } from './allbills/allbills.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { OverviewUserComponent } from './overview-user/overview-user.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './services/filter.pipe';
import { AuthGuardGuard } from './services/auth-guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    LoginVerificationComponent,
    CustomerComponent,
    BillComponent,
    AllbillsComponent,
    UpdateUserComponent,
    PageNotFoundComponentComponent,
    EditUserComponent,
    OverviewUserComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
  ],
  providers: [ AuthenticationService , AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }