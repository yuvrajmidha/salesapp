import React, { useEffect, useState } from 'react'
import { createReactEditorJS } from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './tools';
import DragDrop from 'editorjs-drag-drop';
import Undo from 'editorjs-undo';

const ReactEditorJS = createReactEditorJS()

export default function BlockEditor({value={blocks: []}, onChange=(blocks) => {}}) {

  const editorCore = React.useRef(null)

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const handleReady = () => {
    const editor = editorCore.current._editorJS;
    if(editor){
      new DragDrop(editor);
      new Undo({editor});
    }
  };

  const handleSave = React.useCallback(async () => {
    const elem = editorCore?.current
    const savedData = await elem?.save();
    onChange(savedData.blocks)
  }, [])

  const [loaded, setLoading] = useState(false);
  const [view, setView] = useState(true);

  useEffect(() => {
    if(value?.blocks?.length > 0){
      if(loaded === false){
        setView(false)
        setTimeout(() => {
          setView(true)
        }, 200)
        setLoading(true)
      }
    }
  }, [value])

  return view ? (
    <ReactEditorJS
      onInitialize={handleInitialize}
      defaultValue={value}
      logLevel={"ERROR"}
      onReady={handleReady}
      placeholder="Press Tab for commands"
      tools={EDITOR_JS_TOOLS}
      onChange={(api, event) => {
        // if(event.type === 'block-changed'){
          handleSave()
        // }
      }}
    />
  ) : <></>
}
