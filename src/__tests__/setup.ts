import { configure } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import FileSaver from 'file-saver';
import 'i18n';
import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
import nock from 'nock';

export function noop() {
  return undefined;
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

// necessary mock to use scrollIntoView
window.HTMLElement.prototype.scrollIntoView = noop;
