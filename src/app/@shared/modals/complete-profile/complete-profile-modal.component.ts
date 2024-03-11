import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-complete-profile-modal',
  templateUrl: './complete-profile-modal.component.html',
  styleUrls: ['./complete-profile-modal.component.scss'],
})
export class CompleteProfileModalComponent {
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
  profileId: number
  progressValue = 50;
  
  constructor(
    public activeModal: NgbActiveModal,
    private customerService: CustomerService,
  ) {
    this.getAllinterests();
    this.profileId = +localStorage.getItem('profileId')
  }

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
  }

  bodyType(body: string) {
    this.statusofBody = body;
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
    }
  }
  
  isSelected(id: number): boolean {
    return this.selectedInterests.includes(id);
  }

  submitInterests(){
    const data = {
      profileId: this.profileId,
      interestsList: this.selectedInterests
    }
    this.customerService.addInterests(data).subscribe({
      next: (result) => {
        this.activeModal.close();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
