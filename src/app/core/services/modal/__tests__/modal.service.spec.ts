import { ModalService } from '../modal.service';
import { ModalNotifyComponent } from '@shared/components/modal/notify/notify.component';

jest.mock('@ng-bootstrap/ng-bootstrap');

const setup = (ngModalService: any) => {
  return new ModalService(ngModalService);
};

describe('openNotifyModal', () => {
  it('should open modal with type', () => {
    const modalRef = {
      componentInstance: {},
    };
    const ngModalService = {
      open: jest.fn().mockReturnValue(modalRef),
    };
    const modalService = setup(ngModalService);
    const title = 'title';
    const content = 'content';
    const buttonText = 'buttonText';

    modalService.openNotifyModal({
      title,
      content,
      buttonText,
    });

    expect(ngModalService.open).toHaveBeenCalledTimes(1);
    expect(ngModalService.open).toHaveBeenCalledWith(ModalNotifyComponent, {
      centered: true,
    });

    expect(modalRef).toMatchInlineSnapshot(`
      Object {
        "componentInstance": Object {
          "buttonText": "buttonText",
          "content": "content",
          "title": "title",
        },
      }
    `);
  });
});
