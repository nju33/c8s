import React from 'react';

export interface CrackerProps {
  query: string;
  dangerouslySetInnerHTML: {
    __html: string;
  };
  className?: string;
  style?: any;
}

export interface CrackerState {}

export class Cracker extends React.Component<CrackerProps, CrackerState> {
  private container = React.createRef<any>();
  private _observer = (() => {
    if (typeof window === 'undefined') {
      return;
    }

    return new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio === 0) {
          return;
        }

        if (this._observer === undefined) {
          return;
        }

        const data: any = {...(entry.target as HTMLElement).dataset};

        const tag = document.createElement(data.tag);
        delete data.tag;
        Object.assign(tag, data);

        (entry.target.parentNode as any).insertBefore(tag, entry.target);
        this._observer.unobserve(entry.target);

        requestAnimationFrame(() => {
          (entry.target.parentNode as any).removeChild(entry.target);
        });
      });
    });
  })();

  componentDidMount() {
    this.setState({init: true});

    this.getChildren().forEach(element => {
      if (this._observer === undefined) {
        return;
      }
      this._observer.observe(element);
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  unobserve() {
    if (this._observer === undefined) {
      return;
    }
  }

  private getChildren = (): HTMLElement[] => {
    if (this.container.current === null) {
      return [];
    }

    return Array.from(
      this.container.current.querySelectorAll(this.props.query)
    );
  };

  render() {
    return (
      <div
        ref={this.container}
        style={this.props.style}
        className={this.props.className}
        dangerouslySetInnerHTML={this.props.dangerouslySetInnerHTML}
      />
    );
  }
}
