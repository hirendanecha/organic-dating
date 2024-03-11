import {
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerService } from 'src/app/@shared/services/customer.service';
import { TokenStorageService } from 'src/app/@shared/services/token-storage.service';

@Component({
  selector: 'app-settings-profile',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  isCollapsed: boolean = false;
  visibleIndex = '';
  dynamicComponentContainer: ViewContainerRef;

  constructor(
    private router: Router,
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
        case 'complete-profile':
          this.visibleIndex = 'complete-profile'
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

  goBack() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(): void {
    this.spinner.show();
    this.customerService.logout().subscribe({
      next: (res) => {
        this.spinner.hide();
        this.router.navigate(['/']);
        this.tokenStorageService.signOut();
      },
      error: (error) => {
        this.spinner.hide();
        console.log(error);
      },
    });
  }
}
