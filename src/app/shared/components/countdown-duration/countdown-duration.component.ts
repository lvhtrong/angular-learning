import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  addSeconds,
  differenceInSeconds,
  Duration,
  intervalToDuration,
  isBefore,
} from 'date-fns';
import {
  BehaviorSubject,
  iif,
  interval,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-countdown-duration',
  templateUrl: './countdown-duration.component.html',
  styleUrls: ['./countdown-duration.component.scss'],
})
export class CountdownDurationComponent
  implements OnInit, OnChanges, OnDestroy {
  @Input() startDate: string;
  @Input() endDate: string;

  private readonly defaultRemainingTime = '00:00:00';
  private readonly start$: BehaviorSubject<{ start: Date; end: Date }>;

  readonly remainingTime$: Observable<string>;

  constructor() {
    this.start$ = new BehaviorSubject<{
      start: Date;
      end: Date;
    }>({
      start: new Date('2020-07-25T03:15:16.159Z'),
      end: new Date('2020-07-25T03:15:16.159Z'),
    });

    this.remainingTime$ = this.start$.pipe(
      switchMap((value) => {
        const diffInSeconds = differenceInSeconds(value.end, value.start);

        return iif(
          () => diffInSeconds > 0,
          interval(1000).pipe(
            switchMap((countNumber) => {
              const start = addSeconds(value.start, countNumber);
              const end = value.end;

              return iif(
                () => isBefore(start, end),
                of(
                  intervalToDuration({
                    start,
                    end,
                  })
                ),
                throwError('Start after End')
              );
            })
          ),
          throwError('Start after End')
        );
      }),
      map((duration) => this.formatTime(duration)),
      catchError(() => of(this.defaultRemainingTime))
    );
  }

  ngOnDestroy(): void {
    this.start$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { startDate, endDate } = changes;
    if (startDate || endDate) {
      let start: string = this.startDate;
      if (startDate) {
        start = startDate.currentValue;
      }

      let end: string = this.endDate;
      if (endDate) {
        end = endDate.currentValue;
      }

      this.start$.next({
        start: new Date(start),
        end: new Date(end),
      });
    }
  }

  ngOnInit(): void {}

  private formatTime(duration: Duration) {
    const keys = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];

    const result = keys
      .reduce((currentValue, key, index) => {
        if (index === 0) {
          return this.formatNumber(duration[key]);
        }
        return `${currentValue}:${this.formatNumber(duration[key])}`;
      }, '')
      .replace(RegExp('^(00?:)+'), '')
      .padStart(8, '00:');
    return result;
  }

  private formatNumber(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
