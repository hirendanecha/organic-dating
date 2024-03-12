import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
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
  images = [
    {
      images: [
        {
          img: '',
        },
        {
          img: '',
        },
        {
          img: '',
        },
        {
          img: '',
        },
      ],
      name: '',
      age: '',
      city: '',
      height: '',
      smoke: '',
      graduate: '',
      married: '',
    },
    // {
    //   images: [
    //     {
    //       img: 'assets/images/banner/banner-1.png',
    //     },
    //   ],
    //   name: 'Prashant',
    //   age: 23,
    //   city: 'Surat',
    //   height: '5.10 ft',
    //   smoke: 'Smoke Socially',
    //   graduate: 'Collage Graduate',
    //   married: 'Has No Children',
    // },
    // {
    //   images: [
    //     {
    //       img: 'assets/images/banner/banner-1.png',
    //     },
    //   ],
    //   name: 'Prashant',
    //   age: 23,
    //   city: 'Surat',
    //   height: '5.10 ft',
    //   smoke: 'Smoke Socially',
    //   graduate: 'Collage Graduate',
    //   married: 'Has No Children',
    // },
  ];
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
  constructor(config: NgbCarouselConfig, private customerService: CustomerService) {
    config.interval = 0;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.getProfile(this.pagination);
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
}
