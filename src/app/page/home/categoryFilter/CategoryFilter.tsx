import { Dispatch, SetStateAction } from "react"

interface Props {
    setCategory: Dispatch<SetStateAction<string>>;
}

export default function CategoryFilter({setCategory}: Props) {
    return (
        <select onClick={(e)=>setCategory(e.currentTarget.value)} defaultValue={'all'}  title="Select Category" className="categoryProducts" id="category">
            <option value="all">Todos</option>
            <option value="notebook">Notebook</option>
            <option value="tablet">Tablet</option>
            <option value="phone">Celular</option>
        </select>
    )
}
