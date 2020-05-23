import { TestBed } from '@angular/core/testing';
import { ModalService } from '../modal.service';
import { ModalNotifyComponent } from '@shared/components/modal/notify/notify.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

jest.mock('@ng-bootstrap/ng-bootstrap');
jest.mock('@shared/components/modal/notify/notify.component');

const setup = (): ModalService => {
  return TestBed.inject(ModalService);
};

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      ModalService,
      {
        provide: NgbModal,
        useValue: {
          open: jest.fn().mockReturnValue({
            componentInstance: {},
          }),
        },
      },
    ],
  });
});

describe('openNotifyModal', () => {
  it('should open modal with type and params', () => {
    const ngModalService = TestBed.inject(NgbModal);
    const modalService = setup();
    const title = 'title';
    const content = 'content';
    const buttonText = 'buttonText';

    modalService.openNotifyModal({
      title,
      content,
      buttonText,
    });

    expect(ngModalService.open as jest.Mock).toHaveBeenCalledTimes(1);
    expect(ngModalService.open as jest.Mock).toHaveBeenCalledWith(
      ModalNotifyComponent,
      {
        centered: true,
      }
    );
    expect(ngModalService.open as jest.Mock).toHaveLastReturnedWith({
      componentInstance: {
        title,
        content,
        buttonText,
      },
    });
  });

  it('should open modal with type and without params', () => {
    const ngModalService = TestBed.inject(NgbModal);
    const modalService = setup();

    modalService.openNotifyModal();

    expect(ngModalService.open as jest.Mock).toHaveBeenCalledTimes(1);
    expect(ngModalService.open as jest.Mock).toHaveBeenCalledWith(
      ModalNotifyComponent,
      {
        centered: true,
      }
    );
    expect(ngModalService.open as jest.Mock).toHaveLastReturnedWith({
      componentInstance: {},
    });
  });
});
