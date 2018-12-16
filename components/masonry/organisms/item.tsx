import React from 'react';
import produce from 'immer';
import {MasonryPayload, PayloadContext} from '../payload';

export interface MasonryItemAsset {
  href: string;
  as:
    | 'audio'
    | 'video'
    | 'track'
    | 'script'
    | 'style'
    | 'font'
    | 'image'
    | 'fetch'
    | 'worker'
    | 'embed'
    | 'object'
    | 'document';
  crossorigin?: 'anonymous' | 'use-credentials';
}

export interface MasonryItemProps {
  index: number;
  col?: number;
  assets?: MasonryItemAsset[];
  payload?: MasonryPayload;
}

// tslint:disable-next-line:no-empty-interface
export interface MasonryItemState {}

export type MasonryItemComponent = React.Component<
  MasonryItemProps,
  MasonryItemState
> & {boxRef: React.RefObject<HTMLDivElement>};

export class Original extends React.PureComponent<
  MasonryItemProps,
  MasonryItemState
> {
  static displayName = 'Original(MasonryItem)';
  static defaultProps = {
    col: 1,
    assets: [],
  };

  boxRef = React.createRef<HTMLDivElement>();
  state = produce(d => d)({});

  constructor(props: MasonryItemProps) {
    super(props);

    // tslint:disable-next-line:no-non-null-assertion
    props.payload!.functions.register(this);
  }

  private loadAsset = async (asset: MasonryItemAsset) => {
    return new Promise((resolve, reject) => {
      let tid: number | undefined = window.setTimeout(() => {
        reject('It was timeout');
      }, 30000);

      const node = document.querySelector(
        `link[ref='prefetch'][href='${asset.href}']`,
      );
      if (node !== null) {
        // tslint:disable-next-line:no-non-null-assertion
        node.parentNode!.removeChild(node);
      }

      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.addEventListener('load', () => {
        clearTimeout(tid);
        tid = undefined;

        resolve();
      });
      link.href = asset.href;
      link.as = asset.as;
      if (asset.crossorigin !== undefined) {
        link.crossOrigin = asset.crossorigin;
      }
      // tslint:disable-next-line:no-non-null-assertion
      document.head!.appendChild(link);
    });
  };

  private getPosition(
    props: MasonryItemProps,
  ): {left: number; top: number} | void {
    // tslint:disable-next-line:no-non-null-assertion
    const componentItem: any = props.payload!.state.componentItems.find(
      item => item.component === this,
    );

    if (componentItem === undefined) {
      return;
    }

    // tslint:disable-next-line:no-non-null-assertion
    return componentItem!.position;
  }

  private getSize(props: MasonryItemProps): {width: number} {
    // tslint:disable:no-non-null-assertion
    return {
      width:
        props.payload!.state.sizes[props.col!] +
        (props.col! - 1) * props.payload!.state.gutter,
    };
    // tslint:enable:no-non-null-assertion
  }

  private loadAssets = async () => {
    // tslint:disable-next-line:no-non-null-assertion
    await Promise.all(this.props.assets!.map(this.loadAsset));
    // return this.delay(1000);
  };

  async componentDidMount() {
    await this.loadAssets();
    setTimeout(() => {
      // tslint:disable-next-line:no-non-null-assertion
      this.props.payload!.functions.apportion(this);
    }, 0);
  }

  render() {
    return (
      <>
        <div
          ref={this.boxRef}
          data-col={this.props.col}
          style={{
            opacity: 0,
            position: 'absolute',
            overflow: 'hidden',
            ...(this.getPosition(this.props) || {left: 0, top: 0}),
            ...this.getSize(this.props),
          }}
        >
          {this.props.children}
        </div>

        {this.getPosition(this.props) && (
          <div
            data-col={this.props.col}
            style={{
              // tslint:disable-next-line:no-non-null-assertion
              transitionDelay: '.1s',
              transitionTimingFunction: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
              transitionDuration: '.5s',
              position: 'absolute',
              overflow: 'hidden',
              // tslint:disable-next-line:no-non-null-assertion
              ...this.getPosition(this.props),
              ...this.getSize(this.props),
            }}
          >
            {this.props.children}
          </div>
        )}
      </>
    );
  }
}

const Item = React.memo<Pick<MasonryItemProps, 'index'>>(props => {
  return (
    <PayloadContext.Consumer>
      {payload => {
        return <Original payload={payload} {...props} />;
      }}
    </PayloadContext.Consumer>
  );
});
Item.displayName = 'MasonryItem';

export {Item};
