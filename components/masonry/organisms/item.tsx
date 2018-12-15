import React from 'react';
import produce from 'immer';
import {MasonryPayload, PayloadContext} from '../payload';
import {FaRegFontAwesomeLogoFull} from 'react-icons/fa';

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
  width: number;
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
  state = produce(d => d)({width: 0});

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

  private getPosition(props: MasonryItemProps) {
    // tslint:disable-next-line:no-non-null-assertion
    const componentItem: any = props.payload!.state.componentItems.find(
      item => item.component === this,
    );

    if (componentItem === undefined) {
      return {left: 0, top: 0};
    }

    // tslint:disable-next-line:no-non-null-assertion
    if (props.payload!.state.refresh) {
      return {left: this.state.left, top: this.state.top};
    }

    // tslint:disable-next-line:no-non-null-assertion
    return componentItem!.position;
  }

  private getSize(props: MasonryItemProps): {width: number} {
    // tslint:disable:no-non-null-assertion
    return {
      width: props.payload!.state.refresh
        ? this.state.width
        : props.payload!.state.sizes[props.col!] +
          (props.col! - 1) * props.payload!.state.gutter,
    };
    // tslint:enable:no-non-null-assertion
  }

  // tslint:disable-next-line:max-line-length
  // private delay = async (msec: number) => new Promise(r => setTimeout(r, msec));

  private loadAssets = async () => {
    // tslint:disable-next-line:no-non-null-assertion
    await Promise.all(this.props.assets!.map(this.loadAsset));
    // return this.delay(1000);
  };

  getSnapshotBeforeUpdate(prevProps: MasonryItemProps) {
    // tslint:disable-next-line:no-non-null-assertion
    if (
      // tslint:disable-next-line:no-non-null-assertion
      !prevProps.payload!.state.refresh !== this.props.payload!.state.refresh &&
      this.state.width !== undefined
    ) {
      console.log('SSSS');
      // tslint:disable:no-non-null-assertion
      return {
        ...this.getPosition(prevProps),
        ...this.getSize(prevProps),
      };
      // tslint:enable:no-non-null-assertion
    }

    return null;
  }

  componentDidUpdate(_: any, __: any, ss: null | {width: number}) {
    // console.log('ss', ss);
    if (ss === null) {
      return;
    }

    this.setState(
      produce<MasonryItemState>(draft => {
        Object.assign(draft, ss);
      }),
    );
  }

  async componentDidMount() {
    await this.loadAssets();
    setTimeout(() => {
      // tslint:disable-next-line:no-non-null-assertion
      this.props.payload!.functions.apportion(this);
    }, 0);
  }

  render() {
    // console.log(this.state);
    return (
      <>
        <div
          ref={this.boxRef}
          data-col={this.props.col}
          style={{
            opacity: 0.5,
            position: 'absolute',
            overflow: 'hidden',
            ...this.getPosition(this.props),
            ...this.getSize(this.props),
          }}
        >
          {this.props.children}
        </div>
        <div
          data-col={this.props.col}
          style={{
            transition: '.2s',
            position: 'absolute',
            overflow: 'hidden',
            // tslint:disable-next-line:no-non-null-assertion
            ...(this.props.payload!.state.refresh
              ? this.state
              : {
                  ...this.getPosition(this.props),
                  ...this.getSize(this.props),
                }),
          }}
        >
          {this.props.children}
        </div>
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
