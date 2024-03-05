import dynamic from 'next/dynamic';

const MoonPayProvider = dynamic(
    () => import('@moonpay/moonpay-react').then((mod) => mod.MoonPayProvider),
    { ssr: false },
);

const MoonPayBuyWidget = dynamic(
    () => import('@moonpay/moonpay-react').then((mod) => mod.MoonPayBuyWidget),
    { ssr: false },
);

type Props = {
    visible: boolean;
    onClose: () => void;
}

const MoonPay = ({ onClose, visible }: Props) => {
    return (
        <MoonPayProvider
            apiKey={process.env.NEXT_PUBLIC_MOONPAY_API_KEY || ''}
        >
            <MoonPayBuyWidget
                variant="overlay"
                baseCurrencyCode="usd"
                baseCurrencyAmount="100"
                defaultCurrencyCode="hbar"
                visible={visible}
                onCloseOverlay={onClose}
            />
        </MoonPayProvider>
    )
}

export default MoonPay;

