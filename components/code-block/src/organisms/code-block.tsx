import React from 'react';
import hljs from 'highlight.js';
import {Editor} from '../atoms';
// @ts-ignore
// tslint:disable-next-line:no-import-side-effect
import 'highlight.js/styles/darcula.css';

export interface CodeBlockOrganismDefaultProps {
  children: string;
  lang: string;
}

export class CodeBlock extends React.Component<CodeBlockOrganismDefaultProps> {
  readonly block: React.RefObject<HTMLElement>;

  static defaultProps = {
    children: '',
  };

  constructor(props: CodeBlockOrganismDefaultProps) {
    super(props);

    this.block = React.createRef();
  }

  componentDidMount() {
    // tslint:disable-next-line:no-non-null-assertion
    hljs.highlightBlock(this.block!.current!);
  }

  render() {
    return (
      <Editor>
        <code className={this.props.lang} ref={this.block}>
          {this.props.children.trim()}
        </code>
      </Editor>
    );
  }
}
