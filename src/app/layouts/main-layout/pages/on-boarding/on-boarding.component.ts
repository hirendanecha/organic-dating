import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, fromEvent } from 'rxjs';
import { CustomerService } from 'src/app/@shared/services/customer.service';
import { ToastService } from 'src/app/@shared/services/toast.service';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.scss'],
})
export class OnBoardingComponent implements OnInit {
  currentStep: number = 0;
  steps = [
    'Tell Us Your Location',
    'Add a photo',
    'Vaccine status',
    'Do You Have Children',
    `What's Your Highest Level of Education?`,
    `What's Your Ethnicity?`,
    `What's Your Height?`,
    `What's Your Religion?`,
    'Do You Smoke?',
    'What type of relationship are you looking for?',
  ];
  childOptions = [
    'No',
    'Yes, at home with me',
    "Yes, but they don't live with me",
  ];
  smokeOptions = ['No', 'Yes, socially', 'Yes, regularly'];
  religions: string[] = [
    'Agnostic',
    'Atheist',
    'Buddist',
    'Christian',
    'Christian - Catholic',
    'Hindu',
    'Jewish',
    'Muslim',
    'Other',
    'Sikh',
    'Spiritual',
  ];
  ethnicities = [
    'Black / African Descent',
    'East Asian',
    'Hispanic / Latinx',
    'Middle Eastern',
    'Mixed',
    'Other',
    'South Asian',
    'White / Caucasian',
  ];
  studyOptions = [
    'No degree',
    'High school graduate',
    'Attended college',
    'College graduate',
    'Advanced degree',
  ];

  relationshipOptions = [
    'Friendship',
    'Short term dating',
    'Long term dating',
    'Casual dating',
    `Don't know yet`,
    'Other',
  ];
  defaultCountry = 'US';
  feetOptions: number[] = [];
  inchOptions: number[] = [];
  allCountryData: any;
  @ViewChild('zipCode') zipCode: ElementRef;
  profileImg: any = {
    file: null,
    url: '',
  };
  whatImCovid: string = '';
  whatImFlu: string = '';
  statusofChild: string = '';
  statusofStudy: string = '';
  statusofEthnicity: string = '';
  statusofReligion: string = '';
  statusofSmoke: string = '';
  selectedRelationOptions: string[] = [];

  onBoardingForm = new FormGroup({
    isVaccinated: new FormControl('', [Validators.required]),
    isFluShot: new FormControl('', [Validators.required]),
    haveChild: new FormControl('', [Validators.required]),
    education: new FormControl('', [Validators.required]),
    ethnicity: new FormControl('', [Validators.required]),
    religion: new FormControl('', [Validators.required]),
    isSmoke: new FormControl('', [Validators.required]),
    relationshipType: new FormControl('', [Validators.required]),
    heightFeet: new FormControl('5', [Validators.required]),
    heightInches: new FormControl('0', [Validators.required]),
    country: new FormControl('US', [Validators.required]),
    zip: new FormControl({ value: '', disabled: true }, [Validators.required]),
    city: new FormControl({ value: '', disabled: true }, [Validators.required]),
  });

  constructor(
    private spinner: NgxSpinnerService,
    private customerService: CustomerService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getAllCountries();
  }

  ngAfterViewInit(): void {
    fromEvent(this.zipCode.nativeElement, 'input')
      .pipe(debounceTime(1000))
      .subscribe((event) => {
        const val = event['target'].value;
        if (val.length > 3) {
          this.onZipChange(val);
        }
      });
  }

  goToStep(index: number): void {
    this.currentStep = index;
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submitForm(): void {
    console.log('Form submitted!');
    console.log(this.onBoardingForm.value);
  }

  getAllCountries() {
    // this.spinner.show();
    this.customerService.getCountriesData().subscribe({
      next: (result) => {
        this.spinner.hide();
        this.allCountryData = result;
        this.onBoardingForm.get('zip').enable();
      },
      error: (error) => {
        this.spinner.hide();
        console.log(error);
      },
    });
  }

  onZipChange(event) {
    // this.spinner.show();
    this.customerService
      .getZipData(event, this.onBoardingForm.get('country').value)
      .subscribe(
        (data) => {
          if (data[0]) {
            const zipData = data[0];
            this.onBoardingForm.get('city').enable();
            this.onBoardingForm.patchValue({
              city: zipData.city,
            });
          } else {
            this.onBoardingForm.get('city').disable();
            this.toastService.danger(data?.message);
          }
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
          console.log(err);
        }
      );
  }

  selectFiles(event) {
    this.profileImg = event;
    
  }
  clearProfileImg(event: any): void {
    event.stopPropagation();
    event.preventDefault();

    this.profileImg = {
      file: null,
      url: '',
    };
  }

  vaccineStatus(vaccine: string, type: string) {
    if (type === 'covid') {
      this.whatImCovid = vaccine;
      this.onBoardingForm.get('isVaccinated').setValue(this.whatImCovid);
    } else if (type === 'flu') {
      this.whatImFlu = vaccine;
      this.onBoardingForm.get('isFluShot').setValue(this.whatImFlu);
    }
  }

  childStatus(child: string) {
    this.statusofChild = child;
    this.onBoardingForm.get('haveChild').setValue(this.statusofChild);
  }

  generateId(label: string) {
    return label.toLowerCase().replace(/\s+/g, '');
  }

  studyStatus(study: string) {
    this.statusofStudy = study;
    this.onBoardingForm.get('education').setValue(this.statusofStudy);
  }

  ethnicityStatus(ethnicity: string) {
    this.statusofEthnicity = ethnicity;
    this.onBoardingForm.get('ethnicity').setValue(this.statusofEthnicity);
  }

  religionStatus(religion: string) {
    this.statusofReligion = religion;
    this.onBoardingForm.get('religion').setValue(this.statusofReligion);
  }

  smokeStatus(smoke: string) {
    this.statusofSmoke = smoke;
    this.onBoardingForm.get('isSmoke').setValue(this.statusofSmoke);
  }

  relationshipOption(option: string) {
    const index = this.selectedRelationOptions.indexOf(option);
    if (index === -1) {
      this.selectedRelationOptions.push(option);
    } else {
      this.selectedRelationOptions.splice(index, 1);
    }
    const selectedValue = this.selectedRelationOptions.join(', ');
    this.onBoardingForm.get('relationshipType').setValue(selectedValue);
  }
}
