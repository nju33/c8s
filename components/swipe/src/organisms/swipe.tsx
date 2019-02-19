import React from 'react';
import {number} from 'prop-types';

export interface SwipeProps {
  children: JSX.Element;
}

export interface SwipeState {
  working: boolean;
  baseLayer?: {
    x: number;
    y: number;
  };
  currentLayer?: {
    x: number;
    y: number;
  };
}

export class Swipe extends React.Component<SwipeProps, SwipeState> {
  box = React.createRef<HTMLDivElement>();

  state = {
    working: false
  };

  private recordCurrentLayer(layer: NonNullable<SwipeState['currentLayer']>) {
    this.setState({
      currentLayer: layer
    });
  }

  private isWorking() {
    return this.state.working;
  }

  private intoWorking(baseLayer: NonNullable<SwipeState['baseLayer']>) {
    this.setState({
      working: true,
      baseLayer
    });
  }

  private endWork() {
    this.setState({
      working: false,
      baseLayer: undefined,
      currentLayer: undefined
    });
  }

  private preparePreProcess(el: HTMLElement) {
    ['mousedown' as 'mousedown'].forEach(eventName => {
      el.addEventListener(eventName, (ev: MouseEvent) => {
        ev.preventDefault();
        const target = ev.currentTarget;

        if (ev.layerX > 50) {
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

          const target = ev.currentTarget;
          this.endWork();
        });
      }
    );
  }

  private prepareMainProcess(el: HTMLElement) {
    el.addEventListener('mousemove', (ev: MouseEvent) => {
      ev.preventDefault();

      console.log(this.state);

      if (!this.isWorking()) {
        return;
      }

      this.recordCurrentLayer({
        x: ev.layerX,
        y: ev.layerY
      });

      console.log(this.state);
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
      <div style={{position: 'relative'}}>
        <div
          style={{
            position: 'absolute',
            zIndex: 1,
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
              if (this.state.currentLayer === undefined) {
                return 0;
              }

              return this.state.currentLayer!.x - this.state.baseLayer!.x;
            })()
          }}
        >
          {this.props.children}
        </div>
        <div
          style={{
            position: 'absolute',
            zIndex: 2,
            height: '100%',
            width: '100%'
          }}
        />
      </div>
    );
  }
}
