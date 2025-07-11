import React from 'react';
import { Text } from 'rizzui';

const Disclaimer: React.FC = () => {
    return (
        <Text className='text-center w-4/5 p-4 m-auto leading-regular' style={{ fontSize: 10 }}>
            Disclaimer: Outputs from the AIgent should not be considered legal, financial, or tax advice and is for informational purposes in your journey and to engage in dialogue to help you make decisions. Our AIgents can make mistakes. Consider checking important information with your advisors for extra guidance.
        </Text>
    );
};

export default Disclaimer;