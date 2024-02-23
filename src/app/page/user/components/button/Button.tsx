import './button.css'

type ButtonPorps = {
    handleOnClick: React.MouseEventHandler<HTMLButtonElement>;
    type: 'submit' | 'reset' | 'button';
    className?: string;
    text: string;
    id?: string
}

export default function button(buttonPorps: ButtonPorps) {
    return (
    <button
        onClick={buttonPorps.handleOnClick}
        type={buttonPorps.type}
        className={buttonPorps.className}
        id={buttonPorps.id}
        >
        {buttonPorps.text}
    </button>
    )
}
