'use client'
/* 富文本编辑器 */
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { useEffect, useState } from 'react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import styles from './index.module.scss'

export type RichTextEditorProps = {
  value?: string
  onChange?: (val: string) => void
  className?: string
  toolbarClassName?: string
  editorClassName?: string
  placeholder?: string
  disabled?: boolean
}

export default function ClientRichTextEditor(props: RichTextEditorProps) {
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [html, setHtml] = useState(props.value || '')

  const toolbarConfig = getToolbarConfig(props)
  const editorConfig = getEditorConfig(props)

  useEffect(() => {
    return () => {
      // 销毁编辑器
      if (!editor) return
      editor.destroy()
      setEditor(null)
    }
  })

  function onEditorChanged() {
    const newHtml = editor?.getHtml() || html
    setHtml(newHtml)
    props.onChange?.(newHtml)
  }

  return (
    <div className={`${props.className} ${styles.richEditorBox}`}>
      <Toolbar
        className={`${styles.toolbarBox} ${props.toolbarClassName}`}
        editor={editor}
        defaultConfig={toolbarConfig} mode={'default'}
      />
      <Editor
        className={`${styles.editorBox} ${props.editorClassName}`}
        defaultConfig={editorConfig}
        onCreated={setEditor} onChange={onEditorChanged}
        value={html}
        mode='default'
      />
    </div>
  )
}

function getToolbarConfig(props: RichTextEditorProps): Partial<IToolbarConfig> {
  return {}
}

function getEditorConfig(props: RichTextEditorProps): Partial<IEditorConfig> {
  return {
    placeholder: props.placeholder || '请输入内容'
  }
}