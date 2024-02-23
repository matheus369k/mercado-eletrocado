import { ReactNode } from "react"

import './label.css'

type LabelProps = {
    htmlFor: string
    icon: ReactNode;
    text: string;
}

export default function Label(labelProps: LabelProps) {
    return (
        <label htmlFor={labelProps.htmlFor}>{labelProps.icon}{labelProps.text}:</label>
    )
}
