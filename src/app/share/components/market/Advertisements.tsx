import adNotebook from '../../../assets/notebook-propaganda.png';
import adPhones from '../../../assets/phones-propaganda.jpeg';

export default function Advertisements() {
    return (
        <ul>
            <li><img src={adNotebook} alt="Propaganda de notebooks" /></li>
            <li><img src={adPhones} alt="propaganda de celulares" /></li>
        </ul>
    )
}
