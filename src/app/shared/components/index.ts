import * as fromModals from './modal';
import * as fromFormFields from './form-fields';
import { CountdownDurationComponent } from './countdown-duration/countdown-duration.component';

export const components: any[] = [
  ...fromModals.modals,
  ...fromFormFields.formFields,
  //
  CountdownDurationComponent,
];
