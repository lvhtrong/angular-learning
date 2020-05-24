import {
  Spectator,
  createComponentFactory,
  byText,
} from '@ngneat/spectator/jest';
import { MockService } from 'ng-mocks';
import { ModalNotifyComponent } from '../notify.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

const createComponent = createComponentFactory({
  component: ModalNotifyComponent,
  providers: [
    {
      provide: NgbActiveModal,
      useValue: MockService(NgbActiveModal),
    },
  ],
});

const setup = (): Spectator<ModalNotifyComponent> => {
  return createComponent();
};

it('should render as default', () => {
  const spectator = setup();
  spectator.setInput('title', 'sample title');
  spectator.setInput('content', 'sample content');
  spectator.setInput('buttonText', 'sample button text');

  expect(spectator.element).toMatchSnapshot();
});

describe('tap Close button', () => {
  it('should trigger to hide modal', () => {
    const spectator = setup();

    const closeButton = spectator.query(byText('Close'));
    spectator.click(closeButton);

    const activeModal = spectator.inject(NgbActiveModal);
    expect(activeModal.close).toHaveBeenCalledWith('Close click');
  });
});
