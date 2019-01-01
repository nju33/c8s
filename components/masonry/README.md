# @c8s/masonry

[![github](https://badgen.net/badge//nju33,c8s/000?icon=github&list=1)](https://github.com/nju33/c8s/tree/master/components/masonry)
[![npm:version](https://badgen.net/npm/v/c8s/masonry?icon=npm&label=)](https://www.npmjs.com/package/@c8s/masonry)
[![typescript](https://badgen.net/badge/lang/typescript/0376c6?icon=npm)](https://www.typescriptlang.org/)
[![license](https://badgen.net/npm/license/@c8s/masonry)](https://github.com/nju33/c8s/blob/master/LICENSE)
[![browserslist](https://badgen.net/badge/browserslist/chrome,edge/ffd539?list=1)](https://browserl.ist/?q=last+1+chrome+version%2C+last+1+edge+version)
[![code style:prettier](https://badgen.net/badge//prettier/ff69b3?label=code%20style)](https://github.com/prettier/prettier)

<!-- [![document:typedoc](https://badgen.net/badge/document/typedoc/9602ff)](https://docs--pilaf.netlify.com/) -->
<!-- [![ci:status](https://badgen.net/circleci/github/nju33/c8s)](https://circleci.com/gh/nju33/c8s) -->

## Usage

```ts
/**
 * As to prepare of using the `Masonry`
 * 
 * ```sh
 * yarn add @c8s/masonry react @types/react
 * ```
 */
import Masonry from '@c8s/masonry';
```

## Example

```ts
const createItem = (_: any, i: number) => {
  const col = i % 5 === 1 ? 2 : 1;
  return {
    col,
    style: {
      background: randomcolor({
        luminosity: 'dark',
      }),
    },
  };
};

const items = [...Array(10)].map(createItem);

() => (
  <Masonry col={3} gutter={10}>
    {({Item}) => {
      return (
        <>
          {items.map((style, i) => {
            return (
              <Item
                key={i}
                assets={[
                  {
                    href: `https://dummyimage.com/500x500`,
                    as: 'image',
                  },
                ]}
                index={i}
                col={style.col}
              >
                <div style={{display: 'block'}}>
                  <img
                    src="https://dummyimage.com/500x500"
                    style={{
                      maxWidth: '100%',
                      display: 'block',
                    }}
                  />
                  <div
                    style={{
                      ...style.style,
                      maxWidth: '100%',
                      color: '#000',
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </div>
                </div>
              </Item>
            );
          })}
        </>
      );
    }}
  </Masonry>
);
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/15901038?v=4" width="55px;"/><br /><sub><b>純</b></sub>](https://nju33.com/)<br />[📖](https://github.com/nju33/c8s/commits?author=nju33 "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/42718835?v=4" width="55px;"/><br /><sub><b>Aki-Japan</b></sub>](https://github.com/Aki-Japan)<br />[📖](https://github.com/nju33/c8s/commits?author=Aki-Japan "Documentation") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!