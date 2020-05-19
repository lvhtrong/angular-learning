import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss'],
})
export class ModalNotifyComponent implements OnInit {
  @Input() title = '';
  @Input() content = '';
  @Input() buttonText = 'Close';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
