import React from 'react';
import styles from './styles.module.scss';

type Props = {
    children: React.ReactNode;
};

const WalletForm = ({ children }: Props) => {

    return (
        <div className={`${styles.walletForm} shadow rounded-lg`}>
            {children}
        </div>
    )
}

export default WalletForm;