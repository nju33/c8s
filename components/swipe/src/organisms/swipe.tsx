import React from 'react';
import {number} from 'prop-types';

export interface SwipeProps {
  children: JSX.Element;
}

export interface SwipeLayer {
  x: number;
  y: number;
}

export interface SwipeStyle {
  left: number;
  top: number;
}

export interface SwipeState {
  working: boolean;
  baseLayer?: SwipeLayer;
  style?: SwipeStyle;
  nextEvent: boolean;
}

export enum SwipeDirection {
  Left,
  Right
}

export class Swipe extends React.Component<SwipeProps, SwipeState> {
  box = React.createRef<HTMLDivElement>();

  state: SwipeState = {
    working: false,
    nextEvent: false
  };

  private memoizeForGetDirection = new Map<string, SwipeDirection>();
  private getDirection = (
    baseLayer: SwipeLayer
  ): SwipeDirection | undefined => {
    const key = JSON.stringify(baseLayer);

    if (this.memoizeForGetDirection.has(key)) {
      return this.memoizeForGetDirection.get(key);
    }

    if (this.state.baseLayer === undefined || this.box.current === null) {
      return;
    }

    if (this.state.baseLayer.x < 50) {
      this.memoizeForGetDirection.set(key, SwipeDirection.Left);
      return SwipeDirection.Left;
    } else if (this.state.baseLayer.x > this.box.current.clientWidth - 50) {
      this.memoizeForGetDirection.set(key, SwipeDirection.Right);
      return SwipeDirection.Right;
    }

    return;
  };

  private isWorking() {
    return this.state.working;
  }

  private isDirectionLeft() {
    if (this.state.baseLayer === undefined) {
      return false;
    }

    return this.getDirection(this.state.baseLayer) === SwipeDirection.Left;
  }

  private isDirectionRight() {
    if (this.state.baseLayer === undefined) {
      return false;
    }

    return this.getDirection(this.state.baseLayer) === SwipeDirection.Right;
  }

  private intoWorking(baseLayer: SwipeLayer) {
    this.setState({
      working: true,
      baseLayer
    });
  }

  private endWork() {
    this.setState({
      working: false,
      nextEvent: false,
      baseLayer: undefined,
      style: undefined
    });
  }

  private preparePreProcess(el: HTMLElement) {
    ['mousedown' as 'mousedown'].forEach(eventName => {
      el.addEventListener(eventName, (ev: MouseEvent) => {
        ev.preventDefault();

        if (ev.layerX > 50 && ev.layerX < el.clientWidth - 50) {
          return;
        }

        this.intoWorking({
          x: ev.layerX,
          y: ev.layerY
        });
      });
    });
  }

  private preparePostProcess(el: HTMLElement) {
    ['mouseup' as 'mouseup', 'mouseleave' as 'mouseleave'].forEach(
      eventName => {
        el.addEventListener(eventName, (ev: MouseEvent) => {
          ev.preventDefault();

          if (!this.isWorking()) {
            return;
          }

          if (this.box.current !== null && this.state.nextEvent) {
            const boxWidth = this.box.current.clientWidth;
            let left = boxWidth;
            if (this.isDirectionRight()) {
              left = -boxWidth;
            }

            const handleTransitionend = () => {
              this.endWork();

              if (this.box.current !== null) {
                this.box.current.removeEventListener(
                  'transitionend',
                  handleTransitionend
                );
              }
            };
            this.box.current.addEventListener(
              'transitionend',
              handleTransitionend
            );

            this.setState({
              style: {
                left,
                top: 0
              }
            });
          } else {
            this.endWork();
          }
        });
      }
    );
  }

  private prepareMainProcess(el: HTMLElement) {
    el.addEventListener('mousemove', (ev: MouseEvent) => {
      ev.preventDefault();

      if (!this.isWorking()) {
        return;
      }

      if (this.state.baseLayer === undefined) {
        return;
      }

      if (this.isDirectionLeft()) {
        let nextEvent = false;
        if (this.state.baseLayer !== undefined) {
          nextEvent = ev.layerX - this.state.baseLayer.x > 100;
        }

        this.setState({
          style: {
            left: ev.layerX - this.state.baseLayer.x,
            top: ev.layerY
          },
          nextEvent
        });
        return;
      } else if (this.isDirectionRight()) {
        let nextEvent = false;
        if (this.state.baseLayer !== undefined) {
          nextEvent = this.state.baseLayer.x - ev.layerX > 100;
        }

        this.setState({
          style: {
            left: ev.layerX - this.state.baseLayer.x,
            top: ev.layerY
          },
          nextEvent
        });
      }
    });
  }

  addSwipeEventListener() {
    if (this.box.current === null) {
      return;
    }

    this.preparePreProcess(this.box.current);
    this.preparePostProcess(this.box.current);
    this.prepareMainProcess(this.box.current);
  }

  componentDidMount() {
    this.addSwipeEventListener();
  }

  render() {
    return (
      <div style={{position: 'relative', overflow: 'hidden'}}>
        <div
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 0,
            left: 0,
            height: '100%',
            width: '100%'
          }}
        />
        <div
          ref={this.box}
          style={{
            position: 'relative',
            zIndex: 9,
            transition: '.1s',
            left: (() => {
              if (this.state.style === undefined) {
                return 0;
              }

              return this.state.style.left;
            })()
          }}
        >
          {this.props.children}
        </div>
        <div
          style={{
            background: 'orange',
            position: 'absolute',
            zIndex: 2,
            top: 0,
            left: 0,
            height: '100%',
            width: '100%'
          }}
        />
      </div>
    );
  }
}
