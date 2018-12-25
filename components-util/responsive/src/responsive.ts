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

  from(components: Partial<Components>, tag: string = 'div') {
    console.log(components);
    let injected = false;
    let s;
    let m;
    let l;
    let xl;

    if (components.s !== undefined) {
      s = css`
        ${(components.xl as any).componentStyle.rules}
      `;
      injected = true;
    }

    if (components.m !== undefined) {
      if (injected && this.mediaSizes.m !== undefined) {
        m = css`
          ${this.mediaSizes.m} {
            ${(components.m as any).componentStyle.rules}
          }
        `;
      } else {
        m = css`
          ${(components.m as any).componentStyle.rules}
        `;
      }
    }

    if (components.l !== undefined) {
      if (injected && this.mediaSizes.l !== undefined) {
        l = css`
          ${this.mediaSizes.l} {
            ${(components.l as any).componentStyle.rules}
          }
        `;
      } else {
        l = css`
          ${(components.s as any).componentStyle.rules}
        `;
      }
    }

    if (components.xl !== undefined) {
      if (injected && this.mediaSizes.xl !== undefined) {
        xl = css`
          ${this.mediaSizes.xl} {
            ${(components.xl as any).componentStyle.rules}
          }
        `;
      } else {
        xl = css`
          ${(components.xl as any).componentStyle.rules}
        `;
      }
    }

    return (styled as any)[tag]`
      ${s};
      ${m};
      ${l};
      ${xl};
    `;
  }
}
