import { createHostFactory, Spectator, byLabel } from '@ngneat/spectator/jest';

import { InputFieldComponent } from './input-field.component';
import { EventEmitter } from '@angular/core';

describe('InputFieldComponent', () => {
  const createComponent = createHostFactory({
    component: InputFieldComponent,
  });

  const setup = (props?: any): Spectator<InputFieldComponent> => {
    return createComponent('<app-f-input-field></app-f-input-field>', {
      props,
    });
  };

  it('should create', () => {
    const spectator = setup();
    expect(spectator).toBeTruthy();
  });

  it('should render with inputs', () => {
    const spectator = setup();
    spectator.setInput('id', 'sample-id');
    spectator.setInput('testId', 'sample-testId');
    spectator.setInput('label', 'sample label');
    spectator.setInput('value', 'sample value');
    spectator.setInput('type', 'email');
    spectator.setInput('error', 'sample error');

    expect(spectator.element).toMatchSnapshot();
  });

  it('should invoke textChange event when typing', () => {
    const expectedValue = 'expectedValue';

    const textChange = new EventEmitter<string>();
    const emit = jest.spyOn(textChange, 'emit');

    const spectator = setup({
      textChange,
    });

    const fieldLabel = 'field-label';
    spectator.setInput('label', fieldLabel);

    const inputElement = spectator.query(byLabel(fieldLabel));
    spectator.typeInElement(expectedValue, inputElement);

    expect(emit).toHaveBeenCalledTimes(1);
    expect(emit).toHaveBeenCalledWith(expectedValue);
  });

  describe('error', () => {
    const label = 'Label';

    const setupError = () => {
      const spectator = setup();
      spectator.setInput('label', label);

      return spectator;
    };

    it('should have class "is-invalid"', () => {
      const spectator = setupError();
      spectator.setInput('error', 'error');

      const inputElement = spectator.query(byLabel(label));
      expect(inputElement).toHaveClass('is-invalid');
    });

    it('should not have class "is-invalid"', () => {
      const spectator = setupError();

      const inputElement = spectator.query(byLabel(label));
      expect(inputElement).not.toHaveClass('is-invalid');
    });
  });
});
