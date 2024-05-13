import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { SubscribeModalComponent } from 'src/app/@shared/modals/subscribe-model/subscribe-modal.component';
import { CustomerService } from 'src/app/@shared/services/customer.service';
import { SeoService } from 'src/app/@shared/services/seo.service';
import { SharedService } from 'src/app/@shared/services/shared.service';
import { TokenStorageService } from 'src/app/@shared/services/token-storage.service';

@Component({
  selector: 'app-find-connections',
  templateUrl: './find-connections.component.html',
  styleUrls: ['./find-connections.component.scss'],
})
export class ConnectionsComponent implements OnInit {
  activeSlideIndex: number;
  profileList: any = [];
  currentIndex: number = 0;
  message: string = '';
  pagination: any = {
    page: 0,
    limit: 10,
  };
  profileId: number;
  constructor(
    private seoService: SeoService,
    private customerService: CustomerService,
    private modelService: NgbModal,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {
    const data = {
      title: 'Organic.dating Connections',
      url: `${location.href}`,
      description: '',
    };
    this.seoService.updateSeoMetaData(data);
    this.profileId = +localStorage.getItem('profileId');
  }

  ngOnInit(): void {
    this.getProfile(this.pagination);
  }

  getProfile(paggination): void {
    const gender = this.tokenStorageService.getUser()?.gender;
    this.customerService
      .getProfiles(paggination.page, paggination.limit, this.profileId, gender)
      .subscribe({
        next: (res: any) => {
          this.profileList = res.data;
          // console.log('hello', res);
        },
        error: (err) => {},
      });
  }

  getNextPageGroupPostsById(event: NgbSlideEvent): void {
    if (event.source === 'arrowRight') {
      ++this.currentIndex;
      // this.currentIndex = +event.current.split('-')[2];
      if (this.currentIndex === 10) {
        this.pagination.page = this.pagination.page + 1;
        this.getProfile(this.pagination);
      }
      // if (!group?.page) {
      //   group['page'] = this.pagination.page;
      // } else {
      //   group.page += 1;
      // }
    } else if (event.source === 'arrowLeft') {
      --this.currentIndex;
      // this.currentIndex = +event.current.split('-')[2];
    }
  }

  addDefaultImageIfNeeded(profile): any[] {
    if (!profile.profilePictures || profile.profilePictures.length === 0) {
      profile.profilePictures = [
        {
          imageUrl: '/assets/images/landingpage/OD-default-profile.png',
        },
      ];
    }
    return profile.profilePictures;
  }

  sendMessage() {}

  SendMessageInpt(dataList) {
    // const modalRef = this.modelService.open(SubscribeModalComponent, {
    //   centered: true,
    // });
    // modalRef.componentInstance.dataList = dataList;
    this.router.navigate(['/chats'])
  }
}
