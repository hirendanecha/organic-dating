import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompleteProfileModalComponent } from 'src/app/@shared/modals/complete-profile/complete-profile-modal.component';
import { SharedService } from 'src/app/@shared/services/shared.service';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss'],
})
export class CompleteProfileComponent implements OnInit, AfterViewInit {
  stepLeft = 5;
  progressValue = 20;
  steps: string[] = [
    'Photos',
    'Relationship History',
    'Ideal date',
    'Body Type',
    'Interests',
  ];
  existingUserData: any = {};
  // 'Industry',
  // 'Verification',
  // 'Icebreakers',

  constructor(
    private modalService: NgbModal,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.existingUserData = this.sharedService.userData;
  }

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

  isDone(title: string): boolean {
    switch (title) {
      case 'Relationship History':
        return this.existingUserData.relationshipHistory !== null;
      case 'Body Type':
        return this.existingUserData.bodyType !== null;
      case 'Ideal date':
        return this.existingUserData.idealDate !== null;
      case 'Interests':
        return (
          this.existingUserData.interestList !== null &&
          this.existingUserData.interestList.length > 0
        );
      default:
        return false;
    }
  }
}
