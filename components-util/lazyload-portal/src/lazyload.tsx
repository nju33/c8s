import React from 'react-dom/node_modules/@types/react';

export interface LazyloadProps {
  data: {[index: string]: any};
  onView(element: HTMLElement): () => void;
  observer: IntersectionObserver | undefined;
}

export class Lazyload extends React.Component<LazyloadProps> {
  private box = React.createRef<any>();

  constructor(props: LazyloadProps) {
    super(props);
  }

  componentDidMount() {
    if (this.props.observer === undefined) {
      return;
    }

    if (this.box.current === null) {
      return;
    }

    this.props.onView(this.box.current);
    this.props.observer.observe(this.box.current);
  }

  // componentWillUnmount() {
  //   if (this.props.observer === undefined) {
  //     return;
  //   }

  //   if (this.box.current === null) {
  //     return;
  //   }

  //   this.props.observer.unobserve(this.box.current);
  // }

  render() {
    const Tag = this.props.data.tag;

    const otherData = {...this.props.data};
    delete otherData.tag;

    return (
      <Tag ref={this.box} {...otherData}>
        hoge
      </Tag>
    );
  }
}
