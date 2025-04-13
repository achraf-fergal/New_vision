import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const SelectInput = forwardRef(function SelectInput(
    { className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <select
            {...props}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-gray-300 focus:ring-0 ' +
                className
            }
            ref={localRef}
        >
            {props.children}
        </select>
    );
});

export default SelectInput;
