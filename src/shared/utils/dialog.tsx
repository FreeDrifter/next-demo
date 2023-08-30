'use client'
import { ModalProps } from 'antd'
import { Attributes, Children, FunctionComponent, cloneElement, createElement, isValidElement, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Modal } from 'antd'
import RootRender from '@/shared/helper/RootRender'

export type DialogProps = ModalProps & {
  onClose?: () => void
}

export function loadDialog<P extends {}>(Component: FunctionComponent<P>, props?: Attributes & P & DialogProps) {
  const rootEl = document.createElement('div')
  document.body.appendChild(rootEl)

  const ctx = createRoot(rootEl)

  const dialogs = createElement(Component, {
    ...(props || {}),
    onClose: () => {
      setTimeout(() => {
        ctx.unmount()
        document.body.removeChild(rootEl)
      })
    }
  } as any)

  ctx.render(
    createElement(RootRender, null, dialogs)
  )

  return ctx
}

export function DialogWrap(props: ModalProps) {
  const [visible, setVisible] = useState(true)

  return (
    <Modal
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      {...props}
      open={visible}
    >
      {
        props.children && Children.map(props.children, (child => {
          if (!isValidElement(child)) return null
          return cloneElement(child, {
            onClose: () => setVisible(false)
          } as any)
        }))
      }
    </Modal>
  )
}