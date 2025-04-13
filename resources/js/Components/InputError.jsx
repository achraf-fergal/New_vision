export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-base font-normal text-red-600 ml-1 inline ' + className}
        >
            {message}
        </p>
    ) : null;
}
