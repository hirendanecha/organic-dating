import { NgModule } from '@angular/core';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { AuthLayoutComponent } from './auth-layout.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { CAPTCHA_CONFIG, CaptchaConfig } from 'ng-hcaptcha';
const captchaConfig: CaptchaConfig = {
  siteKey: '7688f62d-8beb-474f-bb3c-0831debb02c4',
  languageCode: 'en',
};

@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    SignUpComponent,
    ResetPasswordComponent,
    AuthHeaderComponent,
  ],
  imports: [SharedModule, AuthLayoutRoutingModule],
  exports: [LoginComponent, SignUpComponent],
  providers: [{ provide: CAPTCHA_CONFIG, useValue: captchaConfig }],
})
export class AuthLayoutModule {}
