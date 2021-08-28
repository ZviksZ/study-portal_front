/// <reference types="react-scripts" />

declare module 'i18next-icu' {
  import { Module } from 'i18next';
  const icuFormatModule: Module;
  export default icuFormatModule;
}
