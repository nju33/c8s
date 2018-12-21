# @c8s/flex

A component for flex layout.

[![github](https://badgen.net/badge//nju33,c8s/000?icon=github&list=1)](https://github.com/nju33/c8s/tree/master/components/flex)
[![npm:version](https://badgen.net/npm/v/c8s/flex?icon=npm&label=)](https://www.npmjs.com/package/@c8s/flex)
[![typescript](https://badgen.net/badge/lang/typescript/0376c6?icon=npm)](https://www.typescriptlang.org/)
<!-- [![ci:status](https://badgen.net/circleci/github/nju33/c8s)](https://circleci.com/gh/nju33/c8s) -->
[![document:typedoc](https://badgen.net/badge/document/typedoc/9602ff)](https://docs--pilaf.netlify.com/)
[![license](https://badgen.net/npm/license/@c8s/flex)](https://github.com/nju33/c8s/blob/master/LICENSE)
[![browserslist](https://badgen.net/badge/browserslist/chrome,edge/ffd539?list=1)](https://browserl.ist/?q=last+1+chrome+version%2C+last+1+edge+version)

## Usage

```ts
/**
 * As to prepare of using the `pilaf`
 * 
 * ```sh
 * yarn add @c8s/flex react @types/react styled-components @types/styled-components
 * ```
 */
import Flex from '@c8s/flex';
```

## Example

```ts
() => (
  <Flex.column>
    <Flex.row>
      <Flex.itemFluid.row>
        <Flex.itemFluid.column>
          <Flex.row>item1-1</Flex.row>
          <Flex.row>item1-2</Flex.row>
        </Flex.itemFluid.column>
      </Flex.itemFluid.row>
      <Flex.item>item2</Flex.item>
    </Flex.row>
    <Flex.row>Flex</Flex.row>
  </Flex.column>
);
```