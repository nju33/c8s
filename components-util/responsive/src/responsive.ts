import React from 'react';
import styled, {css} from 'styled-components';

export interface MediaSizes {
  m: string;
  l: string;
  xl: string;
}

export interface Components
  extends Record<'s' | keyof MediaSizes, React.ReactElement<any>> {}

export class Responsive {
  constructor(public mediaSizes: Partial<MediaSizes>) {}

  getStyle = (
    component: React.ReactElement<any>,
    extendStyle: Partial<CSSStyleDeclaration>,
  ): any => {
    return {...Reflect.get(component, 'componentStyle'), ...extendStyle};
  };

  from(components: Partial<Components>, tag: string = 'div') {
    let injected = false;
    let s;
    let m;
    let l;
    let xl;

    if (components.s !== undefined) {
      s = (
        {s: extendStyle}: {s: Partial<CSSStyleDeclaration>} = {s: {}},
      ) => css`
        ${// tslint:disable-next-line:no-non-null-assertion
        this.getStyle(components.s!, extendStyle)}
      `;
      injected = true;
    }

    if (components.m !== undefined) {
      if (injected && this.mediaSizes.m !== undefined) {
        m = (
          {m: extendStyle}: {m: Partial<CSSStyleDeclaration>} = {m: {}},
        ) => css`
          ${this.mediaSizes.m} {
            ${// tslint:disable-next-line:no-non-null-assertion
            this.getStyle(components.m!, extendStyle)}
          }
        `;
      } else {
        m = (
          {m: extendStyle}: {m: Partial<CSSStyleDeclaration>} = {m: {}},
        ) => css`
          ${// tslint:disable-next-line:no-non-null-assertion
          this.getStyle(components.m!, extendStyle)}
        `;
      }
    }

    if (components.l !== undefined) {
      if (injected && this.mediaSizes.l !== undefined) {
        l = (
          {l: extendStyle}: {l: Partial<CSSStyleDeclaration>} = {l: {}},
        ) => css`
          ${this.mediaSizes.l} {
            ${// tslint:disable-next-line:no-non-null-assertion
            this.getStyle(components.l!, extendStyle)}
          }
        `;
      } else {
        l = (
          {l: extendStyle}: {l: Partial<CSSStyleDeclaration>} = {l: {}},
        ) => css`
          ${// tslint:disable-next-line:no-non-null-assertion
          this.getStyle(components.l!, extendStyle)}
        `;
      }
    }

    if (components.xl !== undefined) {
      if (injected && this.mediaSizes.xl !== undefined) {
        xl = (
          {xl: extendStyle}: {xl: Partial<CSSStyleDeclaration>} = {xl: {}},
        ) => css`
          ${this.mediaSizes.xl} {
            ${// tslint:disable-next-line:no-non-null-assertion
            this.getStyle(components.xl!, extendStyle)}
          }
        `;
      } else {
        xl = (
          {xl: extendStyle}: {xl: Partial<CSSStyleDeclaration>} = {xl: {}},
        ) => css`
          ${// tslint:disable-next-line:no-non-null-assertion
          this.getStyle(components.xl!, extendStyle)}
        `;
      }
    }

    return (styled as any)[tag]<{
      s: Partial<CSSStyleDeclaration>;
      m: Partial<CSSStyleDeclaration>;
      l: Partial<CSSStyleDeclaration>;
      xl: Partial<CSSStyleDeclaration>;
    }>`
      ${s};
      ${m};
      ${l};
      ${xl};
    `;
  }
}
