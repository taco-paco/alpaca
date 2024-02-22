import React, { FC } from 'react';

import s from './index.module.scss';

interface Props {
    message: string | null;
}

export const ErrorMessage: FC<Props> = ({ message }) => {
    if (message) {
        return <div className={s.errorMessage}>{message}</div>;
    }

    return null;
};
