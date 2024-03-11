import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompleteProfileModalComponent } from 'src/app/@shared/modals/complete-profile/complete-profile-modal.component';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss'],
})
export class CompleteProfileComponent implements OnInit, AfterViewInit {
  stepLeft = 5;
  progressValue = 20
  steps: string[] = [
    'Photos',
    'Relationship History',
    'Industry',
    'Body Type',
    'Interests',
  ];
  // 'Verification',
  // 'Icebreakers',

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  selectedStep(step: string) {
    // console.log(step.replace(/\s+/g, ''));
    this.openModel(step);
  }

  completeAllSteps(step) {
    this.openModel(step);
  }

  openModel(step) {
    const modalRef = this.modalService.open(CompleteProfileModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = step;
    // modalRef.componentInstance.confirmButtonLabel = 'Done';
    // modalRef.componentInstance.cancelButtonLabel = 'Cancel';
    // modalRef.componentInstance.data
    modalRef.result.then((res) => {
      if (res) {
        console.log(res);
      }
    });
  }
}
