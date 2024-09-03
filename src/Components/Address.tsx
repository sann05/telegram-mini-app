import { useTonAddress } from '@tonconnect/ui-react';

export const Address = () => {
    const userFriendlyAddress = useTonAddress();

    return (
        userFriendlyAddress && (
            <div>
                <span>User-friendly address: {userFriendlyAddress}</span>
            </div>
        )
    );
};