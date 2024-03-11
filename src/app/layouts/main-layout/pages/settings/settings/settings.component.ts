import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageComponent } from 'src/app/layouts/auth-layout/pages/landing-page/landing-page.component';
import { UnsubscribedUsersComponent } from '../unsubscribed-users/unsubscribed-users.component';
import { HealingPractitionerRegistrationComponent } from '../../healing-practitioner-registration/healing-practitioner-registration.component';
import { NotificationsComponent } from '../../notifications/notification.component';
import { ResearchListComponent } from '../../research/research-list/research-list.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerService } from 'src/app/@shared/services/customer.service';
import { TokenStorageService } from 'src/app/@shared/services/token-storage.service';

@Component({
  selector: 'app-settings-profile',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  isCollapsed: boolean = false;
  visibleIndex = '';
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  dynamicComponentContainer: ViewContainerRef;

  // collapse = [
  //   { text: 'account', routeLink: NotificationsComponent },
  //   { text: 'create', routeLink: ResearchListComponent },
  //   { text: 'profile', routeLink: HealingPractitionerRegistrationComponent },
  //   { text: 'block member', routeLink: UnsubscribedUsersComponent },
  //   { text: 'log out', routeLink: LandingPageComponent },
  // ];

  constructor(
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private spinner: NgxSpinnerService,
    private customerService: CustomerService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit() {}

  closeMenu(e: MouseEvent, type: string) {
    if (e && type) {
      e.preventDefault();
      this.visibleIndex = type;
      this.isCollapsed = !this.isCollapsed;
      switch (type) {
        case 'profile':
          this.visibleIndex = 'profile'
          break;
        case 'logout':
          this.logout();
          break;
        case 'account':
          this.visibleIndex = 'account'
          break;
        case 'create':
          this.visibleIndex = 'create'
          break;
        case 'block':
          this.visibleIndex = 'block'
          break;
        default:
          break;
      }
    }
  }

  toggleSidebar(ind: number) {
    // console.log("isCollapsed  : ", this.isCollapsed);
    console.log('ind  : ', ind);
    // this.router.navigate([`/${link}`]);
  }

  goBack() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(): void {
    // this.isCollapsed = true;
    this.spinner.show();
    this.customerService.logout().subscribe({
      next: (res) => {
        this.spinner.hide();
        this.tokenStorageService.signOut();
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.spinner.hide();
        console.log(error);
      },
    });
  }
}
