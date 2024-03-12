import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { ToastService } from '../../services/toast.service';
import { SharedService } from '../../services/shared.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-complete-profile-modal',
  templateUrl: './complete-profile-modal.component.html',
  styleUrls: ['./complete-profile-modal.component.scss'],
})
export class CompleteProfileModalComponent implements OnInit, AfterViewInit {
  @Input() cancelButtonLabel: string | undefined = 'Cancel';
  @Input() confirmButtonLabel: string | undefined = 'Done';
  @Input() title: string | undefined = 'Complete All Steps';
  @Input() message: string | undefined;

  profilePic: string;
  profileImg: any = {
    file: null,
    url: '',
  };
  statusofRelation: string = '';
  statusofBody: string = '';
  selectedInterests: number[] = [];
  interests: any[];
  profileId: number;
  progressValue = 50;
  updateUserData: any = {};
  idealText: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private customerService: CustomerService,
    private toastService: ToastService,
    private sharedService: SharedService,
    private tokenStorageService: TokenStorageService
  ) {
    this.getAllinterests();
    this.profileId = this.tokenStorageService.getUser()?.profileId;
  }

  ngOnInit(): void {
    this.updateUserData = this.sharedService.userData;

    //set default values
    this.statusofRelation = this.updateUserData.relationshipHistory;
    this.statusofBody = this.updateUserData.bodyType;
    this.idealText = this.updateUserData.idealDate
    this.selectedInterests = this.updateUserData.interestList.map(
      (interest) => interest.interestId
    );
  }

  ngAfterViewInit(): void {}

  relationOptions = [
    'Never Married',
    'Separated',
    'Divorced',
    'Widowed',
    'Tell you later',
  ];

  bodyTypeOptions = ['Slim', 'Athletic', 'Average', 'Stout'];

  getImageName(title: string): string {
    switch (title) {
      case 'Relationship History':
        return 'history.png';
      case `Body Type`:
        return 'human-body.png';
      case 'Photos':
        return 'photo.png';
      case 'Ideal date':
        return 'idealDate.png';
      default:
        return 'default.png';
    }
    // case 'Verification':
    //   return 'photo.png';
    // case 'Industry':
    //   return 'children.png';
    // case `Interests`:
    //   return 'ethnicity.png';
    // case `Icebreakers`:
    //   return 'height.png';
  }

  generateId(label: string) {
    return label.toLowerCase().replace(/\s+/g, '');
  }

  selectFiles(event) {
    this.profileImg = event;
  }

  relationStatus(relation: string) {
    this.statusofRelation = relation;
    this.updateUserData.relationshipHistory = relation;
    this.submitForm();
    this.activeModal.close();
  }

  bodyType(body: string) {
    this.statusofBody = body;
    this.updateUserData.bodyType = body;
    this.submitForm();
    this.activeModal.close();
  }

  submitIdealText(){
    this.updateUserData.idealDate = this.idealText;
    this.submitForm();
    this.activeModal.close();
  }

  getAllinterests() {
    this.customerService.getInterests().subscribe({
      next: (result) => {
        this.interests = result.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onClickInterest(id: number) {
    const index = this.selectedInterests.indexOf(id);
    if (index === -1 && this.selectedInterests.length < 10) {
      this.selectedInterests.push(id);
    } else if (index !== -1) {
      this.selectedInterests.splice(index, 1);
    } else {
      this.toastService.danger(
        'You can only select up to 10 values at a time.'
      );
    }
  }

  isSelected(id: number): boolean {
    return this.selectedInterests.includes(id);
  }

  submitInterests() {
    const existingValue = this.updateUserData.interestList.map(
      (interest) => interest.interestId
    );
    const filteredValue = this.selectedInterests.filter((ele) =>
      !existingValue.includes(ele) ? ele : null
    );
    const data = {
      profileId: this.profileId,
      interestsList: this.selectedInterests,
    };
    this.customerService.addInterests(data).subscribe({
      next: (result) => {
        this.activeModal.close();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  submitForm(): void {
    this.customerService
      .updateProfile(this.profileId, this.updateUserData)
      .subscribe({
        next: (res: any) => {
          if (!res.error) {
            this.toastService.success(res.message);
            this.sharedService.getUserDetails();

          } else {
            this.toastService.danger(res?.message);
          }
        },
        error: (error) => {
          this.toastService.danger(error.error.message);
        },
      });
  }
}
