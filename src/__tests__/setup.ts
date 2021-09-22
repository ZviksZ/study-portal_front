import 'utils/polyfills';

import { configure } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import FileSaver from 'file-saver';
import 'i18n';
import 'jest-extended';
import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
import nock from 'nock';
import 'utils/custom-jest-matchers';
import 'utils/jest-expect-message';

export function noop() {
  return undefined;
}

export function delay(delayTime: number) {
  return new Promise((resolve) => setTimeout(resolve, delayTime));
}

beforeAll(() => {
  global.console.log(
    `Timezone: ${process.env.TZ}, offset: ${(new Date() as Date).getTimezoneOffset() / 60}`,
  );
});

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

afterEach(() => {
  try {
    expect(global.console.error).not.toHaveBeenCalled();
  } finally {
    // cleanup rendered components if any
    cleanup();
    // cleanup fetch mocks
    nock.cleanAll();
    nock.emitter.removeAllListeners();
    nock.restore();
    // remove all pending mocks
    jest.restoreAllMocks();
  }
});

Object.defineProperty(window, 'location', {
  value: {
    ...window.location,
  },
  writable: true,
});

beforeEach(() => {
  if (!nock.isActive()) {
    nock.activate();
  }
  nock.disableNetConnect();

  jest.spyOn(FileSaver, 'saveAs').mockImplementation();

  jest.spyOn(global.console, 'log');
  jest.spyOn(global.console, 'debug');
  jest.spyOn(global.console, 'info').mockImplementation(noop);
  jest.spyOn(global.console, 'warn');
  jest.spyOn(global.console, 'error');

  window.localStorage.clear();
  // urls
  window.history.replaceState = jest.fn();
  window.location.assign = jest.fn();
  window.location.replace = jest.fn();
  window.location.reload = jest.fn();
  window.location.search = '';
  window.open = jest.fn();

  const contextMock = {
    font: '',
    measureText: (name: string) => ({ width: name.length }),
  };
  jest
    .spyOn(HTMLCanvasElement.prototype, 'getContext')
    .mockImplementation(() => contextMock as unknown as CanvasRenderingContext2D);
});

configure({ testIdAttribute: 'data-ui-purpose' });

if (!('__isPatched' in global.console)) {
  Object.defineProperty(global.console, '__isPatched', {
    value: true,
  });
  const oldConsoleWarn = global.console.warn.bind(console);
  global.console.warn = (message: any, ...args: any[]) => {
    if (typeof message === 'string') {
      // Ignore Algolia and Recharts messy warnings
      const toIgnore = [
        'Warning: UNSAFE_componentWillMount is deprecated',
        'Warning: UNSAFE_componentWillReceiveProps is deprecated',
        'Warning: componentWillMount has been renamed, and is not recommended for use.',
        'Warning: componentWillReceiveProps has been renamed, and is not recommended for use.',
        'deck: WebGL2 not supported by this browser. Transition animation is disabled.',
        'react-i18next:: It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.',
      ];
      if (toIgnore.some((m) => message.includes(m))) {
        return;
      }
    }
    oldConsoleWarn(message, ...args);
  };

  const oldConsoleLog = global.console.log.bind(console);
  global.console.log = (message: any, ...args: any[]) => {
    if (typeof message === 'string') {
      const toIgnore = ['set deck.log.level=1 (or higher) to trace attribute updates'];
      if (toIgnore.some((m) => message.includes(m))) {
        return;
      }
    }
    oldConsoleLog(message, ...args);
  };
}

// necessary mock to make popper.js (tooltips) with jest tests
window.document.createRange = () =>
  ({
    setStart: noop,
    setEnd: noop,
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: window.document,
    },
  } as any as Range);

// necessary mock to use scrollIntoView
window.HTMLElement.prototype.scrollIntoView = noop;

// necessary mock to test recharts' tooltips
if (!Object.getOwnPropertyDescriptor(window.MouseEvent.prototype, 'pageX')) {
  Object.defineProperty(window.MouseEvent.prototype, 'pageX', {
    get() {
      return this.clientX;
    },
  });
  Object.defineProperty(window.MouseEvent.prototype, 'pageY', {
    get() {
      return this.clientY;
    },
  });
}

if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = () => {
    // Do nothing
    // We mock this function for mapbox-gl to work
    return '';
  };
}

jest.mock('mapbox-gl');
