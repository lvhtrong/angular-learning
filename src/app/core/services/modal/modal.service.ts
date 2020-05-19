import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalNotifyComponent } from '@shared/components/modal/notify/notify.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  /**
   * openNotifyModal
   */
  public openNotifyModal(options?: {
    title?: string;
    content?: string;
    buttonText?: string;
  }) {
    const modalRef = this.modalService.open(ModalNotifyComponent, {
      centered: true,
    });

    if (options?.title) {
      modalRef.componentInstance.title = options?.title;
    }
    if (options?.content) {
      modalRef.componentInstance.content = options?.content;
    }
    if (options?.buttonText) {
      modalRef.componentInstance.buttonText = options?.buttonText;
    }
  }
}
