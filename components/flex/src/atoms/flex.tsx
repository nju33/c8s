import React from 'react';
import memoizee from 'memoizee';
import styled from '@c8s/theme';

interface FlexProps {
  flex: CSSStyleDeclaration['flex'];
}

type FlexComponent = React.SFC<Partial<FlexProps>>;

interface FlexComponentProxy
  extends Record<'row' | 'column' | 'item' | 'itemFluid', FlexComponent> {}

// tslint:disable:max-line-length
interface FlexDirection
  extends Record<
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'centerLeft'
    | 'centerCenter'
    | 'centerRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight',
    FlexComponent & Pick<FlexComponentProxy, 'item' | 'itemFluid'>
  > {}
// tslint:enable:max-line-length

// tslint:disable-next-line:max-line-length
interface FlexType
  extends Record<keyof FlexComponentProxy | keyof FlexDirection, number> {}

const flexType: FlexType & {[x: string]: number} = {
  row: 1,
  column: 1 << 1,
  item: 1 << 2,
  itemFluid: 1 << 3,
  topLeft: 1 << 4,
  topCenter: 1 << 5,
  topRight: 1 << 6,
  centerLeft: 1 << 7,
  centerCenter: 1 << 8,
  centerRight: 1 << 9,
  bottomLeft: 1 << 10,
  bottomCenter: 1 << 11,
  bottomRight: 1 << 12,
};

interface FlexComponentFlag {
  bit: number;
}

type FlexComponentProxyReturn<
  P extends keyof FlexComponentProxy | keyof FlexDirection
> = P extends 'row'
  ? FlexComponent &
      Pick<FlexComponentProxy, 'item' | 'itemFluid'> &
      FlexDirection
  : P extends 'column'
  ? FlexComponent &
      Pick<FlexComponentProxy, 'item' | 'itemFluid'> &
      FlexDirection
  : P extends 'item'
  ? FlexComponent & Pick<FlexComponentProxy, 'row' | 'column'>
  : P extends 'itemFluid'
  ? FlexComponent & Pick<FlexComponentProxy, 'row' | 'column'>
  : never;

interface FakeFlexComponentProxy {
  row: FlexComponentProxyReturn<'row'>;
  column: FlexComponentProxyReturn<'column'>;
  item: FlexComponentProxyReturn<'item'>;
  itemFluid: FlexComponentProxyReturn<'itemFluid'>;
}

interface FakeParentFlexComponentProxy {
  topLeft: FlexComponentProxyReturn<'topLeft'>;
  topCenter: FlexComponentProxyReturn<'topCenter'>;
  topRight: FlexComponentProxyReturn<'topRight'>;
  centerLeft: FlexComponentProxyReturn<'centerLeft'>;
  centerCenter: FlexComponentProxyReturn<'centerCenter'>;
  centerRight: FlexComponentProxyReturn<'centerRight'>;
  bottomLeft: FlexComponentProxyReturn<'bottomLeft'>;
  bottomCenter: FlexComponentProxyReturn<'bottomCenter'>;
  bottomRight: FlexComponentProxyReturn<'bottomRight'>;
}

const createComponent = memoizee(
  (bit: number, props: Partial<FlexProps>) => {
    const decls: Partial<CSSStyleDeclaration> = {};
    const row = Boolean(bit & flexType.row);
    const column = Boolean(bit & flexType.column);

    // tslint:disable:no-switch-case-fall-through
    switch (true) {
      case row: {
        decls.display = 'flex';
      }
      case column: {
        decls.display = 'flex';
        decls.flexDirection = 'column';
      }
      case Boolean(bit & flexType.item): {
        decls.flex = props.flex || '0';
      }
      case Boolean(bit & flexType.itemFluid): {
        decls.flex = props.flex || '1';
      }
      case Boolean(bit & flexType.topLeft): {
        decls.justifyContent = 'flex-start';
        decls.alignItems = 'flex-start';
      }
      case Boolean(bit & flexType.topCenter): {
        if (column) {
          decls.justifyContent = 'flex-start';
          decls.alignItems = 'center';
        } else {
          decls.justifyContent = 'center';
          decls.alignItems = 'flex-start';
        }
      }
      case Boolean(bit & flexType.topRight): {
        if (column) {
          decls.justifyContent = 'flex-start';
          decls.alignItems = 'flex-end';
        } else {
          decls.justifyContent = 'flex-end';
          decls.alignItems = 'flex-start';
        }
      }
      case Boolean(bit & flexType.centerLeft): {
        if (column) {
          decls.justifyContent = 'center';
          decls.alignItems = 'flex-start';
        } else {
          decls.justifyContent = 'flex-start';
          decls.alignItems = 'center';
        }
      }
      case Boolean(bit & flexType.centerCenter): {
        decls.justifyContent = 'center';
        decls.alignItems = 'center';
      }
      case Boolean(bit & flexType.centerRight): {
        if (column) {
          decls.justifyContent = 'center';
          decls.alignItems = 'flex-end';
        } else {
          decls.justifyContent = 'flex-end';
          decls.alignItems = 'center';
        }
      }
      case Boolean(bit & flexType.bottomLeft): {
        if (column) {
          decls.justifyContent = 'flex-end';
          decls.alignItems = 'flex-start';
        } else {
          decls.justifyContent = 'flex-start';
          decls.alignItems = 'flex-end';
        }
      }
      case Boolean(bit & flexType.bottomCenter): {
        if (column) {
          decls.justifyContent = 'flex-end';
          decls.alignItems = 'center';
        } else {
          decls.justifyContent = 'center';
          decls.alignItems = 'flex-end';
        }
      }
      case Boolean(bit & flexType.bottomRight): {
        decls.justifyContent = 'flex-end';
        decls.alignItems = 'flex-end';
      }
      default: {
        return styled.div(decls as any);
      }
    }
    // tslint:enable:no-switch-case-fall-through
  },
  {
    normalizer: args => {
      return JSON.stringify(args[1]);
    },
  },
);

const createFlexProxy = () => {
  const flag: FlexComponentFlag = {bit: 0b0000000000000};

  return new Proxy<FakeFlexComponentProxy>(
    (flag as unknown) as FakeFlexComponentProxy,
    {
      get(
        target: FakeFlexComponentProxy & FakeParentFlexComponentProxy,
        key: string,
        receiver: FakeFlexComponentProxy & FakeParentFlexComponentProxy,
      ): any {
        const _flag = (target as unknown) as FlexComponentFlag;
        _flag.bit = _flag.bit & flexType[key];

        return receiver;
      },
      apply(_target, _thisArg, props?: Partial<FlexProps>) {
        return () => createComponent(flag.bit, props || {});
      },
    },
  );
};

export const Flex = createFlexProxy();
