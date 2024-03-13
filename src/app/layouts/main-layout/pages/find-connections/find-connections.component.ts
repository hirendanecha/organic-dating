import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbModal, NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { SubscribeModalComponent } from 'src/app/@shared/modals/subscribe-model/subscribe-modal.component';
import { CustomerService } from 'src/app/@shared/services/customer.service';

@Component({
  selector: 'app-find-connections',
  templateUrl: './find-connections.component.html',
  styleUrls: ['./find-connections.component.scss'],
})
export class ConnectionsComponent implements OnInit {
  message: string = '';
  pagination: any = {
    page: 0,
    limit: 10,
  };
  intrests = [
    'Athelet',
    'Dancing',
    'Writing',
    'Cricket',
    'Politics',
    'Gujarati',
    'Coding',
    'Chess',
    'Science',
    'Ancient History',
    'Finance',
    'Science',
    'Ancient History',
    'Finance',
    'Science',
    'Ancient History',
    'Finance',
    'Science',
    'Ancient History',
    'Finance',
  ];
  activeSlideIndex: number;
  profileList: any = [];
  constructor(config: NgbCarouselConfig, 
    private customerService: CustomerService,
    private modelService:NgbModal) {
    config.interval = 0;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.getProfile(this.pagination);
  }

  addDefaultImageIfNeeded(profile): any[] {
    if (!profile.profilePictures || profile.profilePictures.length === 0) {
      profile.profilePictures = [{
        imageUrl: '/assets/images/landingpage/OD-default-profile.png'
      }];
    }
    return profile.profilePictures;
  }

  getNextPageGroupPostsById(event: NgbSlideEvent): void {
    if (event.source === 'arrowRight') {
      const index = +event.current.split('-')[2];
      if (index === 10) {
        this.pagination.page = this.pagination.page + 1;
        this.getProfile(this.pagination);
      }
      // if (!group?.page) {
      //   group['page'] = this.pagination.page;
      // } else {
      //   group.page += 1;
      // }
    }
  }

  sendMessage() {}

  getProfile(paggination): void {
    this.customerService
      .getProfiles(paggination.page, paggination.limit)
      .subscribe({
        next: (res: any) => {
          this.profileList = res.data;
          console.log('hello', res);
        },
        error: (err) => {},
      });
  }
  SendMessageInpt(){
    const modalRef = this.modelService.open(SubscribeModalComponent, {
      centered: true,
    });
  }
}
