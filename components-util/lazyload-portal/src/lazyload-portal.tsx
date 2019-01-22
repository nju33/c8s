import React from 'react';
import {createPortal} from 'react-dom';
import {Lazyload} from './lazyload';

export class LazyloadPortal {
  elements: HTMLElement[];
  private callbacks: ((element: HTMLElement) => () => void)[];
  private _observer: IntersectionObserver | undefined;

  constructor(parent: HTMLElement, query: string) {
    this.elements = Array.from(parent.querySelectorAll(query));
    this.callbacks = this.elements.map(() => {
      return (element: HTMLElement) => () => {
        if (this._observer === undefined) {
          return;
        }

        this._observer.unobserve(element);
      };
    });
  }

  componentDidMount() {
    if (typeof window === 'undefined') {
      return;
    }

    this._observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        console.log(entry);
      });
    });
  }

  unobserve() {
    if (this._observer === undefined) {
      return;
    }
  }

  private createPortal() {
    this.elements.forEach((element, idx) => {
      const data = {...element.dataset};
      createPortal(
        <Lazyload
          data-LAZYLOAD_PORTAL-idx={idx}
          data={data}
          observer={this._observer}
          onView={this.callbacks[idx]}
        />,
        element
      );
    });
  }
}
