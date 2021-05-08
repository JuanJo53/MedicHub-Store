import { PharmAdminAccountComponent } from "./modules/pharm-admin/pages/pharm-admin-account/pharm-admin-account.component";
import { SubsidiaryDetailComponent } from "./modules/admin/pages/subsidiary-detail/subsidiary-detail.component";
import { AdminGuard } from "./core/guards/admin.guard";
import { MainComponent } from "./layout/main/main.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./modules/home/pages/login/login.component";
import { SignupComponent } from "./modules/home/pages/signup/signup.component";
import { DashboardComponent } from "./modules/admin/pages/dashboard/dashboard.component";
import { PharmaciesComponent } from "./modules/admin/pages/pharmacies/pharmacies.component";
import { ProductsComponent } from "./modules/pharm-admin/pages/products/products.component";
import { PharmDashboardComponent } from "./modules/pharm-admin/pages/pharm-dashboard/pharm-dashboard.component";
import { BrandsComponent } from "./modules/pharm-admin/pages/brands/brands.component";
import { BankAccountComponent } from "./modules/pharm-admin/pages/bank-account/bank-account.component";
import { PharmAdminGuard } from "./core/guards/pharm-admin.guard";
import { ReportsPageComponent } from "./modules/admin/pages/reports-page/reports-page.component";
import { ClientsPageComponent } from "./modules/admin/pages/clients-page/clients-page.component";
import { ClientProfilePageComponent } from "./modules/client/pages/client-profile-page/client-profile-page.component";
import { PharmaciesPageComponent } from "./modules/client/pages/pharmacies-page/pharmacies-page.component";
import { ClientCardsComponent } from "./modules/client/pages/client-cards/client-cards.component";
import { ClientGuard } from "./core/guards/client.guard";
import { ClientHomeComponent } from "./modules/client/pages/client-home/client-home.component";
import { SubsidiaryDetailsComponent } from "./modules/client/pages/subsidiary-details/subsidiary-details.component";
import { ProductDetailComponent } from "./modules/client/pages/product-detail/product-detail.component";
import { AdminAccountComponent } from "./modules/admin/pages/admin-account/admin-account.component";
import { SalesComponent } from "./modules/pharm-admin/pages/sales/sales.component";
import { OrdersComponent } from "./modules/pharm-admin/pages/orders/orders.component";
import { OrderComponent } from "./modules/client/pages/order/order.component";
import { OrdersHistoryComponent } from "./modules/client/pages/orders-history/orders-history.component";
import { PharmReportsPageComponent } from "./modules/pharm-admin/pages/pharm-reports-page/pharm-reports-page.component";

const routes: Routes = [
  // {
  //   path: "**",
  //   redirectTo: "login",
  // },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "admin/dashboard",
        canActivate: [AdminGuard],
        component: DashboardComponent,
      },
      {
        path: "admin/account",
        canActivate: [AdminGuard],
        component: AdminAccountComponent,
      },
      {
        path: "admin/reports",
        canActivate: [AdminGuard],
        component: ReportsPageComponent,
      },
      {
        path: "admin/pharmacy",
        canActivate: [AdminGuard],
        component: PharmaciesComponent,
      },
      {
        path: "admin/pharmacy/subsidiary/:id",
        canActivate: [AdminGuard],
        component: SubsidiaryDetailComponent,
      },
      {
        path: "admin/clients",
        canActivate: [AdminGuard],
        component: ClientsPageComponent,
      },
    ],
  },
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "pharmAdmin/dashboard",
        canActivate: [PharmAdminGuard],
        component: PharmDashboardComponent,
      },
      {
        path: "pharmAdmin/account",
        canActivate: [PharmAdminGuard],
        component: PharmAdminAccountComponent,
      },
      {
        path: "pharmAdmin/reports",
        canActivate: [PharmAdminGuard],
        component: PharmReportsPageComponent,
      },
      {
        path: "pharmAdmin/sales",
        canActivate: [PharmAdminGuard],
        component: SalesComponent,
      },
      {
        path: "pharmAdmin/orders",
        canActivate: [PharmAdminGuard],
        component: OrdersComponent,
      },
      {
        path: "pharmAdmin/products",
        canActivate: [PharmAdminGuard],
        component: ProductsComponent,
      },
      {
        path: "pharmAdmin/brands",
        canActivate: [PharmAdminGuard],
        component: BrandsComponent,
      },
      {
        path: "pharmAdmin/bankAccount",
        canActivate: [PharmAdminGuard],
        component: BankAccountComponent,
      },
    ],
  },
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "client/home",
        canActivate: [ClientGuard],
        component: ClientHomeComponent,
      },
      {
        path: "client/account",
        canActivate: [ClientGuard],
        component: ClientProfilePageComponent,
      },
      {
        path: "client/ordersHistory",
        canActivate: [ClientGuard],
        component: OrdersHistoryComponent,
      },
      {
        path: "client/pharmacies",
        canActivate: [ClientGuard],
        component: PharmaciesPageComponent,
      },
      {
        path: "client/pharmacies/:id",
        canActivate: [ClientGuard],
        component: SubsidiaryDetailsComponent,
      },
      {
        path: "client/pharmacies/:id/product/:pid",
        canActivate: [ClientGuard],
        component: ProductDetailComponent,
      },
      {
        path: "client/creditCards",
        canActivate: [ClientGuard],
        component: ClientCardsComponent,
      },
      {
        path: "client/order",
        canActivate: [ClientGuard],
        component: OrderComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
