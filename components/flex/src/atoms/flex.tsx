import React from 'react';
import styled from '@8s/theme';
import memoizee from 'memoizee';

interface FlexProps {
  flex: CSSStyleDeclaration['flex'];
}

type FlexComponent = React.SFC<Partial<FlexProps>>;

interface FlexComponentProxy
  extends Record<'row' | 'column' | 'item', FlexComponent> {}

interface FlexType extends Record<'row' | 'column' | 'item', number> {}

const flexType: FlexType & {[x: string]: number} = {
  row: 1,
  column: 1 << 1,
  item: 1 << 2,
};

interface FlexComponentFlag {
  bit: number;
}

type FlexComponentProxyReturn<P extends string> = P extends 'row'
  ? FlexComponent & Pick<FlexComponentProxy, 'item'>
  : P extends 'column'
  ? FlexComponent & Pick<FlexComponentProxy, 'item'>
  : P extends 'item'
  ? FlexComponent & Pick<FlexComponentProxy, 'row' | 'column'>
  : never;

interface FakeFlexComponentProxy {
  row: FlexComponentProxyReturn<'row'>;
  column: FlexComponentProxyReturn<'column'>;
  item: FlexComponentProxyReturn<'item'>;
}

const createComponent = memoizee((bit: number, props: Partial<FlexProps>) => {
  const decls: Partial<CSSStyleDeclaration> = {};

  // tslint:disable:no-switch-case-fall-through
  switch (true) {
    case Boolean(bit & flexType.row): {
      decls.display = 'flex';
    }
    case Boolean(bit & flexType.column): {
      decls.display = 'flex';
      decls.flexDirection = 'column';
    }
    case Boolean(bit & flexType.item): {
      decls.flex = props.flex || '1';
    }
    default: {
      return styled.div(decls);
    }
  }
  // tslint:enable:no-switch-case-fall-through
});

const createFlexProxy = () => {
  const flag: FlexComponentFlag = {bit: 0b000};

  return new Proxy<FakeFlexComponentProxy>(
    (flag as unknown) as FakeFlexComponentProxy,
    {
      get(
        target: FakeFlexComponentProxy,
        key: string,
        receiver: FakeFlexComponentProxy,
      ): any {
        const _flag = (target as unknown) as FlexComponentFlag;
        _flag.bit = _flag.bit & flexType[key];

        return receiver;
      },
      apply(_target, _thisArg, props: Partial<FlexProps>) {
        return () => createComponent(flag.bit, props);
      },
    },
  );
};

export const Flex = createFlexProxy();
