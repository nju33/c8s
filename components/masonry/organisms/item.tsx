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

    props.payload.functions.register(this);
  }

  private loadAsset = async (asset: MasonryItemAsset) => {
    return new Promise((resolve, reject) => {
      let tid = setTimeout(() => {
        reject('It was timeout');
      }, 30000);

      const node = document.querySelector(
        `link[ref='prefetch'][href='${asset.href}']`,
      );
      if (node !== null) {
        node.parentNode.removeChild(node);
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
      document.head.appendChild(link);
    });
  };

  private getPosition() {
    const componentItem = this.props.payload.state.componentItems.find(
      item => item.component === this,
    );

    return componentItem.position;
  }

  private loadAssets = async () => {
    return Promise.all(this.props.assets.map(this.loadAsset));
  };

  async componentDidMount() {
    await this.loadAssets();
    setTimeout(() => {
      this.props.payload.functions.apportion(this);
    }, 0);
  }

  render() {
    if (!this.props.payload.state.init) {
      return (
        <div ref={this.boxRef} data-col={this.props.col} style={{opacity: 0.1}}>
          {this.props.children}
        </div>
      );
    }

    return (
      <div
        ref={this.boxRef}
        data-col={this.props.col}
        style={{position: 'absolute', ...this.getPosition()}}
      >
        {this.props.children}
      </div>
    );
  }
}

const Item = React.memo(props => {
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
