import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}

  /**
   * openNotifyModal
   */
  public openNotifyModal = jest.fn();
}
