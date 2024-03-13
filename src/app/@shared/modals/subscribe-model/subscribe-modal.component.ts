import { Component, Input, TemplateRef, inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subscribe-modal',
  templateUrl: './subscribe-modal.component.html',
  styleUrls: ['./subscribe-modal.component.scss'],
})
export class SubscribeModalComponent {
  @Input() cancelButtonLabel: string | undefined = 'Cancel';
  @Input() confirmButtonLabel: string | undefined = 'Confirm';
  @Input() title: string | undefined = 'Organic Dating';
  @Input() message: string | undefined ='Subscribe to send ashley your message now';
  constructor(public activeModal: NgbActiveModal,) {}
  
  profile:any = [
    {
      img:'assets/images/landingpage/OD-default-profile.png'
    }
  ]

}
