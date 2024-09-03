import { useTonWallet } from '@tonconnect/ui-react';

export const Wallet = () => {
    const wallet = useTonWallet();

    return (
        wallet && (
            <div>
                <span>Connected wallet: {wallet.account.address}</span>
                <span>Device: {wallet.device.appName}</span>
            </div>
        )
    );
};