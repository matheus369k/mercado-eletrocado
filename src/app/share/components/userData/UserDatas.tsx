import { FaCircleUser } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePlace } from "react-icons/md";

import { appUseSelector } from "../../../store/hook"

export default function UserDatas() {
    const useSelectorUser = appUseSelector(state => state.user)

    return (
        <ul>
            <li className='icon-persona'>
                <FaCircleUser />
            </li>
            <li className='user-infor'>
                <strong><GoPeople />Nome:</strong> {Object(useSelectorUser).name}
            </li>
            <li className='user-infor'>
                <strong><GoPeople />Sobrenome:</strong> {Object(useSelectorUser).lastName}
            </li>
            <li className='user-infor'>
                <strong><MdOutlineEmail />E-mail:</strong> {Object(useSelectorUser).email}
            </li>
            <li className='user-infor'>
                <strong><MdOutlinePlace />CEP:</strong> {Object(useSelectorUser).cep}
            </li>
        </ul>
    )
}
