import { Component } from '@angular/core';
import { NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-find-connections',
  templateUrl: './find-connections.component.html',
  styleUrls: ['./find-connections.component.scss'],
})
export class ConnectionsComponent {
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
  constructor() {}

  getNextPageGroupPostsById(event: NgbSlideEvent): void {
    if (event.source === 'arrowRight') {
      // if (!group?.page) {
      //   group['page'] = this.pagination.page;
      // } else {
      //   group.page += 1;
      // }
    }
  }
}
