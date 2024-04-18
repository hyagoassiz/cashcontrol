import { ReactNode } from "react"

export interface ITableColumn {
    key: string
    label: string | ReactNode
    // style?: CSSProperties
    // align?: 'left' | 'center' | 'right' | 'justify' | 'inherit'
    // disablePadding?: boolean
    // sortable?: boolean
    // verticalAlign?: string
  }