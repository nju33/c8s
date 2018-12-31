import React from 'react';
import styled from 'styled-components';
import memoizee from 'memoizee';
// import {Flex as FlexTag} from './atoms';

interface FlexProps
  extends Pick<
    CSSStyleDeclaration,
    | 'flex'
    | 'flexGrow'
    | 'flexShrink'
    | 'flexBasis'
    | 'flexDirection'
    | 'flexWrap'
    | 'justifyContent'
    | 'alignItems'
    | 'alignContent'
    | 'alignSelf'
    | 'order'
  > {}

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
    | 'center'
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
  center: 1 << 8,
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
  center: FlexComponentProxyReturn<'center'>;
  centerRight: FlexComponentProxyReturn<'centerRight'>;
  bottomLeft: FlexComponentProxyReturn<'bottomLeft'>;
  bottomCenter: FlexComponentProxyReturn<'bottomCenter'>;
  bottomRight: FlexComponentProxyReturn<'bottomRight'>;
}

export const createDecls = memoizee(
  (bit: number, props: Partial<FlexProps>) => {
    const decls: Partial<CSSStyleDeclaration> = {};
    const row = Boolean(bit & flexType.row);
    const column = Boolean(bit & flexType.column);
    const item = Boolean(bit & flexType.item);
    const itemFluid = Boolean(bit & flexType.itemFluid);

    if (row || column) {
      decls.display = 'flex';
    }

    if (column) {
      decls.flexDirection = 'column';
    }

    if (item) {
      decls.flex = props.flex || '0';
    } else if (itemFluid) {
      decls.flex = props.flex || '1';
    }

    switch (true) {
      case Boolean(bit & flexType.topLeft): {
        decls.justifyContent = 'flex-start';
        decls.alignItems = 'flex-start';
        break;
      }
      case Boolean(bit & flexType.topCenter): {
        if (column) {
          decls.justifyContent = 'flex-start';
          decls.alignItems = 'center';
        } else {
          decls.justifyContent = 'center';
          decls.alignItems = 'flex-start';
        }
        break;
      }
      case Boolean(bit & flexType.topRight): {
        if (column) {
          decls.justifyContent = 'flex-start';
          decls.alignItems = 'flex-end';
        } else {
          decls.justifyContent = 'flex-end';
          decls.alignItems = 'flex-start';
        }
        break;
      }
      case Boolean(bit & flexType.centerLeft): {
        if (column) {
          decls.justifyContent = 'center';
          decls.alignItems = 'flex-start';
        } else {
          decls.justifyContent = 'flex-start';
          decls.alignItems = 'center';
        }
        break;
      }
      case Boolean(bit & flexType.center): {
        decls.justifyContent = 'center';
        decls.alignItems = 'center';
        break;
      }
      case Boolean(bit & flexType.centerRight): {
        if (column) {
          decls.justifyContent = 'center';
          decls.alignItems = 'flex-end';
        } else {
          decls.justifyContent = 'flex-end';
          decls.alignItems = 'center';
        }
        break;
      }
      case Boolean(bit & flexType.bottomLeft): {
        if (column) {
          decls.justifyContent = 'flex-end';
          decls.alignItems = 'flex-start';
        } else {
          decls.justifyContent = 'flex-start';
          decls.alignItems = 'flex-end';
        }
        break;
      }
      case Boolean(bit & flexType.bottomCenter): {
        if (column) {
          decls.justifyContent = 'flex-end';
          decls.alignItems = 'center';
        } else {
          decls.justifyContent = 'center';
          decls.alignItems = 'flex-end';
        }
        break;
      }
      case Boolean(bit & flexType.bottomRight): {
        decls.justifyContent = 'flex-end';
        decls.alignItems = 'flex-end';
        break;
      }
      default:
    }

    return decls;
  },
  {
    normalizer: args => {
      return args[0];
    },
  },
);

const createFlexProxy = () => {
  // tslint:disable-next-line:no-empty
  const flag: FlexComponentFlag = () => {};
  flag.bit = 0b0000000000000;
  Object.defineProperty(flag, 'componentStyle', {
    get() {
      return createDecls(this.bit, {});
    },
  });

  return new Proxy<FakeFlexComponentProxy>(
    (flag as unknown) as FakeFlexComponentProxy,
    {
      apply(_target, _thisArg, args) {
        const [_props] = args;

        const {children, ...props} = {children: null, ..._props} as {
          children: React.ReactNode;
        } & {
          [x: string]: any;
        };

        const clonedProps = {...props};
        delete clonedProps.flex;
        delete clonedProps.flexGrow;
        delete clonedProps.flexShrink;
        delete clonedProps.flexBasis;
        delete clonedProps.flexDirection;
        delete clonedProps.flexWrap;
        delete clonedProps.justifyContent;
        delete clonedProps.alignItems;
        delete clonedProps.alignContent;
        delete clonedProps.alignSelf;
        delete clonedProps.order;

        const decls = createDecls(flag.bit, props || {});
        const Tag = styled.div<any>(decls as any);
        return <Tag {...clonedProps}>{children}</Tag>;
      },
      get(
        target: FakeFlexComponentProxy & FakeParentFlexComponentProxy,
        key: string,
        receiver: FakeFlexComponentProxy & FakeParentFlexComponentProxy,
      ): any {
        if (
          [
            'row',
            'column',
            'item',
            'itemFluid',
            'topLeft',
            'topCenter',
            'topRight',
            'centerLeft',
            'center',
            'centerRight',
            'bottomLeft',
            'bottomCenter',
            'bottomRight',
          ].indexOf(key) === -1
        ) {
          return Reflect.get(target, key, receiver);
        }

        const _flag = (target as unknown) as FlexComponentFlag;
        _flag.bit = _flag.bit | flexType[key as string];

        return receiver;
      },
    },
  );
};

const Flex = {} as FakeFlexComponentProxy;
Object.defineProperties(Flex, {
  row: {
    get: () => createFlexProxy().row,
  },
  column: {
    get: () => createFlexProxy().column,
  },
  item: {
    get: () => createFlexProxy().item,
  },
  itemFluid: {
    get: () => createFlexProxy().itemFluid,
  },
});
export {Flex};
