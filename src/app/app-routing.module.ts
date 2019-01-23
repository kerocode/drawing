import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LogInComponent } from "./log-in/log-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { DrawItComponent } from "./draw-it/draw-it.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

//app routes 
const appRoutes: Routes = [
    {
      path:'log-in',
      component: LogInComponent
    },
    {
      path:'sign-up',
      component: SignUpComponent
    },
    {
      path: 'home',
      component: HomePageComponent
    },
    {
      path: 'draw',
      component: DrawItComponent,
      canActivate: [AuthGuardService] 
    },
    { path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
  ];
  @NgModule({
    imports: [
      RouterModule.forRoot(appRoutes,
        {enableTracing:true}) // <-- debugging purposes only
    ],
    exports: [
      RouterModule
    ]
  })
  export class appRoutingModule { }