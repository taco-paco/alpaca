import React, { ChangeEvent, CSSProperties, FocusEventHandler } from 'react';
import { ErrorMessage } from '../ErrorMessage';

import s from './index.module.css';

type Props = {
    value: string;
    name?: string;
    onChange: (arg0: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (arg0: React.FocusEvent<HTMLInputElement>) => void;
    onFocus: FocusEventHandler<HTMLInputElement>;
    // TODO: enable with ref?
    // autoFocus?: boolean;
    placeholder?: string;
    // TODO: enable passing className?
    // className?: string;
    errorMessage?: string | undefined;
    // warningMessage?: string;
    isDisabled?: boolean;
    isNumber?: boolean;
    // isInvalid?: boolean;
    style?: CSSProperties;
    // onEnterPressed?: () => void;
    // inputRef?: { current: HTMLInputElement | null };
    title?: string;
    // onPaste?(data: string): boolean;
};

const TextField = (props: Props) => {
    const onChangeWithValidation = (
        isNumber: boolean | undefined,
        event: ChangeEvent<HTMLInputElement>,
        onChange: ((arg0: ChangeEvent<HTMLInputElement>) => void) | undefined
    ) => {
        const value = event.currentTarget.value;
        if (isNumber && isNaN(Number(value))) {
            return;
        }

        if (onChange) {
            onChange(event);
        }
    };

    return (
        <div className={s.textFieldContainer}>
            <input
                type="text"
                name={props.name}
                value={props.value}
                className={s.textField}
                onChange={(event) => {
                    onChangeWithValidation(props.isNumber, event, props.onChange);
                }}
                onBlur={props.onBlur}
                onFocus={props.onFocus}
                disabled={props.isDisabled}
                title={props.title}
                style={props.style}
                placeholder={props.placeholder}
            />
            {props.errorMessage && <ErrorMessage message={props.errorMessage} />}
        </div>
    );
};
export default TextField;
