# @c8s/breadcrumb

[![github](https://badgen.net/badge//nju33,c8s/000?icon=github&list=1)](https://github.com/nju33/c8s/tree/master/components/breadcrumb)
[![npm:version](https://badgen.net/npm/v/c8s/breadcrumb?icon=npm&label=)](https://www.npmjs.com/package/@c8s/breadcrumb)
[![typescript](https://badgen.net/badge/lang/typescript/0376c6?icon=npm)](https://www.typescriptlang.org/)
[![license](https://badgen.net/npm/license/@c8s/breadcrumb)](https://github.com/nju33/c8s/blob/master/LICENSE)
[![browserslist](https://badgen.net/badge/browserslist/chrome,edge/ffd539?list=1)](https://browserl.ist/?q=last+1+chrome+version%2C+last+1+edge+version)

<!-- [![document:typedoc](https://badgen.net/badge/document/typedoc/9602ff)](https://docs--pilaf.netlify.com/) -->
<!-- [![ci:status](https://badgen.net/circleci/github/nju33/c8s)](https://circleci.com/gh/nju33/c8s) -->

## Usage

```ts
/**
 * As to prepare of using the `Breadcrumb`
 * 
 * ```sh
 * yarn add @c8s/breadcrumb react @types/react styled-components @types/styled-components
 * ```
 */
import Breadcrumb from '@c8s/breadcrumb';
/**
 * This should use with `@c8s/theme`.
 * 
 * ```sh
 * yarn add @c8s/theme
 * ```
 */
import {Theme, theme} from '@c8s/theme';
```

## Example

```ts
() => (
  <Theme theme={theme}>
    {/* ... */}
      <Breadcrumb>
        <a href="...">Home</a>
        <a href="...">List</a>
        <a href="..." aria-selected={true}>Detail</a>
      </Breadcrumb>
    {/* ... */}
  </Theme>
);
```

In NextJS

```ts
import Link from 'next/link';

() => (
   <Theme theme={theme}>
    {/* ... */}
      <Breadcrumb>
        <Link>
          <a href="...">Home</a>
        </Link>
        <Link>
          <a href="...">List</a>
        </Link>
        <Link>
          <a href="..." aria-selected={true}>Detail</a>
        </Link>
      </Breadcrumb>
    {/* ... */}
  </Theme> 
)
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/15901038?v=4" width="55px;"/><br /><sub><b>純</b></sub>](https://nju33.com/)<br />[📖](https://github.com/nju33/c8s/commits?author=nju33 "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/42718835?v=4" width="55px;"/><br /><sub><b>Aki-Japan</b></sub>](https://github.com/Aki-Japan)<br />[📖](https://github.com/nju33/c8s/commits?author=Aki-Japan "Documentation") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!