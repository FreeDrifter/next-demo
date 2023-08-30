'use client'

import dynamic from 'next/dynamic'
import { RichTextEditorProps } from './Editor'

const ClientRichTextEditor = dynamic(() => import('./Editor'), { ssr: false })

/* 富文本编辑器 */
export default function RichTextEditor(props: RichTextEditorProps) {
  return (
    <ClientRichTextEditor {...props} />
  )
}