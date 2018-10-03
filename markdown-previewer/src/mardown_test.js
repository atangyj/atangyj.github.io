import React from 'react';
import marked from 'marked';


export class MarkdownExample extends React.Component {
  getMarkdownText() {
    var rawMarkup = marked('This is _Markdown_.', {sanitize: true});
    return { __html: rawMarkup };
  }
  render() {
    return <p dangerouslySetInnerHTML={this.getMarkdownText()} />
  }
}
