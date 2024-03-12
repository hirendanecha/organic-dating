import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbCarouselConfig, NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/@shared/services/customer.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @ViewChild('slidesContainer') slidesContainer: ElementRef;
  @ViewChild('btnPrev') btnPrev!: ElementRef;
  @ViewChild('btnNext') btnNext!: ElementRef;

  imgWidth: number = 0;
  isSlideAnimating: boolean = false;
  slides: any = [
    {
      img: 'assets/images/banner/banner-1.png',
    },
    {
      img: 'assets/images/landingpage/OD-default-profile.png',
    },
  ];
  rightImage: any = [
    {
      img: 'assets/images/landingpage/OD-default-profile.png',
    },
    {
      img: 'assets/images/landingpage/OD-default-profile.png',
    },
    {
      img: 'assets/images/landingpage/OD-default-profile.png',
    },
    {
      img: 'assets/images/landingpage/OD-default-profile.png',
    },
  ];
  pictureList: any = [];
  pagination: any = {
    page: 0,
    limit: 10,
  };

  currentSlideIndex = 0;
  currentImageIndex: number = this.pictureList.length - 1;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.currentImageIndex = this.pictureList.length;
    this.getPictures(this.pagination);
  }

  prev() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.pictureList.length - 1;
    }
  }
  
  next() {
    if (this.currentImageIndex < this.pictureList.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
  }
  backFirst(){
    this.currentImageIndex=0
  }

  getPictures(paggination) {
    return this.customerService
      .getPictures(paggination.page, paggination.limit)
      .subscribe({
        next: (res: any) => {
          this.pictureList = res.data;
          console.log('hello', this.pictureList);
        },
        error: (err) => {},
      });
  }

  isFirstSlide(): boolean {
    return this.currentSlideIndex === 0;
  }

  isLastSlide(): boolean {
    const slides = this.slidesContainer?.nativeElement?.children;

    return this.currentSlideIndex === slides?.length - 1;
  }
}
