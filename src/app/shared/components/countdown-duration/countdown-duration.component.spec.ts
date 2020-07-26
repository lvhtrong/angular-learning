import { createHostFactory, Spectator } from '@ngneat/spectator/jest';
import { cold, hot } from 'jest-marbles';
import { CountdownDurationComponent } from './countdown-duration.component';
import { tick, fakeAsync } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { SimpleChange } from '@angular/core';

type Props = {
  startDate?: string;
  endDate?: string;
};

type SpectatorAlias = Spectator<CountdownDurationComponent>;

//#region utilities

const createComponent = createHostFactory({
  component: CountdownDurationComponent,
});

function setup(props?: Props): SpectatorAlias {
  return createComponent('<app-countdown-duration></app-countdown-duration>', {
    props,
  });
}

function shouldRenderAsDefault(props?: Props) {
  const spectator = setup(props);

  const observable = cold('(a|)', {
    a: '00:00:00',
  });

  expect(spectator.component.remainingTime$).toBeObservable(observable);
}

function shouldCountDownToZero(
  spectator: SpectatorAlias,
  props: Props,
  expectedValues: string[]
) {
  spectator.component.ngOnChanges({
    ...Object.entries(props).reduce((currentValue, [key, value]) => {
      return {
        ...currentValue,
        [key]: getChange({
          currentValue: value,
        }),
      };
    }, {}),
  });

  const results = [];
  spectator.component.remainingTime$.subscribe({
    next: (value) => {
      results.push(value);
    },
  });

  expect(spectator.component.remainingTime$).toSatisfyOnFlush(() => {
    expect(results).toEqual(expectedValues);
  });
}

function getChange(prop: {
  previousValue?: any;
  currentValue: any;
  firstChange?: boolean;
  isFirstChange?: () => boolean;
}): SimpleChange {
  return {
    currentValue: prop.currentValue,
    firstChange: prop.firstChange ?? true,
    isFirstChange: prop.isFirstChange ?? (() => true),
    previousValue: null,
  };
}

//#endregion

//#region tests

it('should create', () => {
  const spectator = setup();
  expect(spectator).toBeTruthy();
});

describe('startDate and endDate are not specified', () => {
  it('should render as default', () => {
    shouldRenderAsDefault();
  });
});

describe('startDate is after endDate', () => {
  it('should render as default', () => {
    shouldRenderAsDefault({
      startDate: '2020-07-25T03:15:13.159Z',
      endDate: '2020-07-25T03:15:10.159Z',
    });
  });
});

describe('startDate changed', () => {
  const startDate = '2020-07-25T03:15:12.159Z';
  const endDate = '2020-07-25T03:15:16.159Z';

  describe('new start date is before end date', () => {
    const newStartDate = '2020-07-25T03:15:13.159Z';

    it('should countdown to 0', fakeAsync(() => {
      const spectator = setup({
        startDate,
        endDate,
      });

      shouldCountDownToZero(
        spectator,
        {
          startDate: newStartDate,
        },
        ['00:00:03', '00:00:02', '00:00:01', '00:00:00']
      );

      tick(4000);
    }));
  });

  describe('new start date is after end date', () => {
    const newStartDate = '2020-07-25T03:15:17.159Z';

    it('should render as default', fakeAsync(() => {
      const spectator = setup({
        startDate,
        endDate,
      });

      shouldCountDownToZero(
        spectator,
        {
          startDate: newStartDate,
        },
        ['00:00:00']
      );

      tick(4000);
    }));
  });
});

describe('endDate changed', () => {
  const startDate = '2020-07-25T03:15:12.159Z';
  const endDate = '2020-07-25T03:15:16.159Z';

  describe('new end date is after start date', () => {
    const newEndDate = '2020-07-25T03:15:13.159Z';

    it('should countdown to 0', fakeAsync(() => {
      const spectator = setup({
        startDate,
        endDate,
      });

      shouldCountDownToZero(
        spectator,
        {
          endDate: newEndDate,
        },
        ['00:00:01', '00:00:00']
      );

      tick(4000);
    }));
  });

  describe('new end date is before start date', () => {
    const newEndDate = '2020-07-25T03:15:10.159Z';

    it('should render as default', fakeAsync(() => {
      const spectator = setup({
        startDate,
        endDate,
      });

      shouldCountDownToZero(
        spectator,
        {
          endDate: newEndDate,
        },
        ['00:00:00']
      );

      tick(4000);
    }));
  });
});

//#endregion
