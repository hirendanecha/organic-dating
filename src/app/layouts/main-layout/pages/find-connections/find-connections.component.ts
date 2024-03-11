import { Component } from '@angular/core';
import { NgbCarouselConfig, NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-find-connections',
  templateUrl: './find-connections.component.html',
  styleUrls: ['./find-connections.component.scss'],
})
export class ConnectionsComponent {
  message: string = '';
  pagination: any = {
    page: 0,
    limit: 0,
    limitArray: [],
  };
  images = [
    {
      images: [
        {
          img: 'assets/images/banner/banner-1.png',
        },
        {
          img: 'assets/images/banner/banner-1.png',
        },
        {
          img: 'assets/images/banner/banner-1.png',
        },
        {
          img: 'assets/images/banner/banner-1.png',
        },
      ],
      name: 'Prashant',
      age: 23,
      city: 'Surat',
      height: '5.10 ft',
      smoke: 'Smoke Socially',
      graduate: 'Collage Graduate',
      married: 'Has No Children',
    },
    {
      images: [
        {
          img: 'assets/images/banner/banner-1.png',
        },
      ],
      name: 'Prashant',
      age: 23,
      city: 'Surat',
      height: '5.10 ft',
      smoke: 'Smoke Socially',
      graduate: 'Collage Graduate',
      married: 'Has No Children',
    },
    {
      images: [
        {
          img: 'assets/images/banner/banner-1.png',
        },
      ],
      name: 'Prashant',
      age: 23,
      city: 'Surat',
      height: '5.10 ft',
      smoke: 'Smoke Socially',
      graduate: 'Collage Graduate',
      married: 'Has No Children',
    },
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
  constructor(config: NgbCarouselConfig) {
    config.interval = 0;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  getNextPageGroupPostsById(event: NgbSlideEvent): void {
    this.activeSlideIndex = +event.current.split('-')[2];
    if (event.source === 'arrowRight') {
      // if (!group?.page) {
      //   group['page'] = this.pagination.page;
      // } else {
      //   group.page += 1;
      // }
    }
  }
  nextSlide() {
    if (this.activeSlideIndex < this.images.length - 1) {
      this.activeSlideIndex++;
    }
  }

  prevSlide() {
    if (this.activeSlideIndex > 0) {
      this.activeSlideIndex--;
    }
  }

  sendMessage() {}
}
