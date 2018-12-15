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

export interface MasonryItemState {
  ready: boolean;
}

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

  private getPosition() {
    // tslint:disable-next-line:no-non-null-assertion
    const componentItem = this.props.payload!.state.componentItems.find(
      item => item.component === this,
    );

    // tslint:disable-next-line:no-non-null-assertion
    return componentItem!.position;
  }

  private getSize(): {width: number} {
    // tslint:disable:no-non-null-assertion
    return {
      width:
        this.props.payload!.state.sizes[this.props.col!] +
        (this.props.col! - 1) * this.props.payload!.state.gutter,
    };
    // tslint:enable:no-non-null-assertion
  }

  private loadAssets = async () => {
    // tslint:disable-next-line:no-non-null-assertion
    return Promise.all(this.props.assets!.map(this.loadAsset));
  };

  async componentDidMount() {
    await this.loadAssets();
    setTimeout(() => {
      // tslint:disable-next-line:no-non-null-assertion
      this.props.payload!.functions.apportion(this);
    }, 0);
  }

  render() {
    // tslint:disable-next-line:no-non-null-assertion
    if (!this.props.payload!.state.ready && !this.props.payload!.state.rerun) {
      return (
        <div ref={this.boxRef} data-col={this.props.col} style={{opacity: 0}}>
          {this.props.children}
        </div>
      );
    }

    return (
      <div
        ref={this.boxRef}
        data-col={this.props.col}
        style={{
          transition: '.2s',
          position: 'absolute',
          ...this.getPosition(),
          ...this.getSize(),
          overflow: 'hidden',
        }}
      >
        {this.props.children}
      </div>
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
