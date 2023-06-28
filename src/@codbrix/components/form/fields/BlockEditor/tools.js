// tools.js
// import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import LinkTool from '@editorjs/link'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import NestedList from '@editorjs/nested-list';
import Delimiter from '@editorjs/delimiter'
import SimpleImage from '@editorjs/simple-image'
import editorjsCodeflask from '@calumk/editorjs-codeflask';
import MarkerTool from './marker'

export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  // embed: Embed,
  table: Table,
  list: {
    class: NestedList,
    inlineToolbar: true,
    config: {
      defaultStyle: 'ordered'
    },
  },
  // paragraph: Paragraph,
  linkTool: LinkTool,
  // inlineCode: {
  //   class: InlineCode
  // },
  raw: Raw,
  marker: MarkerTool,
  header: {
    class: Header,
    config: {
      placeholder: 'Type heading',
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 3
    }
  },
  quote: Quote,
  paragraph: {
    class: Paragraph,
    inlineToolbar: true
  },
  delimiter: Delimiter,
  simpleImage: SimpleImage,
  code: {
    class: editorjsCodeflask,
    inlineToolbar: true,
    config:{
      showlinenumbers: false
    }
  }
  
}