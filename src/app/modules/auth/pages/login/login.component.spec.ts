import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { AuthService } from '@core/domains/auth/services/auth.service';
import { ModalService } from '@core/services/modal/modal.service';
import { Observable, throwError } from 'rxjs';
import { MockService } from 'ng-mocks';
import { SpectatorOverrides, byText, byTestId } from '@ngneat/spectator';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { LoginComponent } from './login.component';

jest.mock('@core/domains/auth/services/auth.service');
jest.mock('@core/services/modal/modal.service');

//#region utils

const login = jest
  .fn()
  .mockReturnValue(new Observable((observe) => observe.next()));
const navigate = jest.fn();
const openNotifyModal = jest.fn();

const createComponent = createComponentFactory({
  component: LoginComponent,
  providers: [
    {
      provide: AuthService,
      useValue: {
        login,
      },
    },
    {
      provide: ActivatedRoute,
      useValue: MockService(ActivatedRoute),
    },
    {
      provide: Router,
      useValue: {
        navigate,
      },
    },
    {
      provide: ModalService,
      useValue: {
        openNotifyModal,
      },
    },
  ],
  imports: [SharedModule],
});

const setup = (options?: SpectatorOverrides<LoginComponent>) => {
  return createComponent(options);
};

const typeInField = (
  fieldName: string,
  value = 'any',
  spectator: Spectator<LoginComponent>
) => {
  const fieldElement = spectator.query(byTestId(`login-${fieldName}-field`));
  spectator.typeInElement(value, fieldElement);
};

const clickLoginButton = (spectator: Spectator<LoginComponent>) => {
  const loginButton = spectator.query(byTestId('login-login-button'));
  spectator.click(loginButton);
};

//#endregion

beforeEach(() => {
  login.mockClear();
  navigate.mockClear();
  openNotifyModal.mockClear();
});

it('should render as expected', () => {
  const spectator = setup();

  expect(spectator.element).toMatchSnapshot();
});

describe.each([['username'], ['password']])('%s field', (field) => {
  const errorMessage = {
    username: 'User Name is required',
    password: 'Password is required',
  };

  describe('without typing then click login', () => {
    it('should show error message', () => {
      const spectator = setup();

      clickLoginButton(spectator);

      const errorElement = spectator.query(byText(errorMessage[field]));
      expect(errorElement).toBeVisible();
    });
  });

  describe('type then click login', () => {
    it('should not show error message', () => {
      const spectator = setup();

      typeInField(field, undefined, spectator);
      clickLoginButton(spectator);

      const errorElement = spectator.query(byText(errorMessage[field]));
      expect(errorElement).not.toBeVisible();
    });
  });
});

describe('type mandatory fields then click Login button', () => {
  const setupValuesThenLogin = (
    values: {
      username: string;
      password: string;
    },
    options: SpectatorOverrides<LoginComponent> = { providers: [] }
  ) => {
    const spectator = setup(options);

    typeInField('username', values.username, spectator);
    typeInField('password', values.password, spectator);
    clickLoginButton(spectator);

    return spectator;
  };

  describe('typed values are valid', () => {
    const username = 'username@mail.com';
    const password = '123456';

    const setupPageOpenedWithRedirectUrl = (
      redirectUrl?: string,
      options: SpectatorOverrides<LoginComponent> = { providers: [] }
    ) => {
      const activatedRoute = {
        queryParamMap: new Observable((observe) => {
          observe.next({
            get: jest.fn().mockReturnValue(redirectUrl),
          });
        }),
      };

      const spectator = setupValuesThenLogin(
        {
          username,
          password,
        },
        {
          ...options,
          providers: [
            ...options?.providers,
            {
              provide: ActivatedRoute,
              useValue: activatedRoute,
            },
          ],
        }
      );

      return spectator;
    };

    describe('page is opened without redirect url', () => {
      it('should navigate to root url', (done) => {
        const spectator = setupPageOpenedWithRedirectUrl();

        const authService = spectator.inject(AuthService);
        const router = spectator.inject(Router);

        expect(authService.login).toHaveBeenCalledTimes(1);
        expect(authService.login).toHaveBeenCalledWith({
          username,
          password,
        });

        authService.login.mock.results[0].value.subscribe(() => {
          expect(router.navigate).toHaveBeenCalledTimes(1);
          expect(router.navigate).toHaveBeenCalledWith(['']);

          done();
        });
      });

      it('should not open error modal', (done) => {
        const spectator = setupPageOpenedWithRedirectUrl();

        const authService = spectator.inject(AuthService);
        const modalService = spectator.inject(ModalService);

        authService.login.mock.results[0].value.subscribe(() => {
          expect(modalService.openNotifyModal).not.toHaveBeenCalled();

          done();
        });
      });
    });

    describe('page is opened with redirect url', () => {
      const redirectUrl = 'redirectUrl';

      it('should navigate to redirect url', (done) => {
        const spectator = setupPageOpenedWithRedirectUrl(redirectUrl);

        const authService = spectator.inject(AuthService);
        const router = spectator.inject(Router);

        expect(authService.login).toHaveBeenCalledTimes(1);
        expect(authService.login).toHaveBeenCalledWith({
          username,
          password,
        });

        authService.login.mock.results[0].value.subscribe(() => {
          expect(router.navigate).toHaveBeenCalledTimes(1);
          expect(router.navigate).toHaveBeenCalledWith([redirectUrl]);

          done();
        });
      });

      it('should not open error modal', (done) => {
        const spectator = setupPageOpenedWithRedirectUrl(redirectUrl);

        const authService = spectator.inject(AuthService);
        const modalService = spectator.inject(ModalService);

        authService.login.mock.results[0].value.subscribe(() => {
          expect(modalService.openNotifyModal).not.toHaveBeenCalled();

          done();
        });
      });
    });
  });

  describe('typed values are invalid', () => {
    const username = 'username@mail.com';
    const password = '123456';

    const setupTypeInvalidValues = (
      options: SpectatorOverrides<LoginComponent> = { providers: [] }
    ) => {
      const spectator = setupValuesThenLogin(
        {
          username,
          password,
        },
        {
          ...options,
          providers: [
            ...options?.providers,
            {
              provide: AuthService,
              useValue: {
                login: jest.fn().mockReturnValue(
                  throwError({
                    error: {
                      message: 'invalid username or password',
                    },
                  })
                ),
              },
            },
            {
              provide: ActivatedRoute,
              useValue: {
                queryParamMap: new Observable((observe) => {
                  observe.next({
                    get: jest.fn().mockReturnValue('redirectUrl'),
                  });
                }),
              },
            },
          ],
        }
      );

      return spectator;
    };

    it('should show "Incorrect email or password" modal', (done) => {
      const spectator = setupTypeInvalidValues();

      const authService = spectator.inject(AuthService);
      const modalService = spectator.inject(ModalService);

      authService.login.mock.results[0].value.subscribe({
        error: () => {
          expect(modalService.openNotifyModal).toHaveBeenCalledTimes(1);
          expect(modalService.openNotifyModal).toHaveBeenCalledWith({
            content: 'Incorrect email or password',
          });

          done();
        },
      });
    });

    it('should throw error', (done) => {
      const spectator = setupTypeInvalidValues();

      const authService = spectator.inject(AuthService);

      authService.login.mock.results[0].value.subscribe({
        error: (error: any) => {
          expect(error).toStrictEqual({
            error: {
              message: 'invalid username or password',
            },
          });

          done();
        },
      });
    });
  });
});
