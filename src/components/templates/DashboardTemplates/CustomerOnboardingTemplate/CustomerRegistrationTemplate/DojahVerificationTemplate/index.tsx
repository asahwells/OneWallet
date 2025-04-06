'use client';

import React from 'react';
import Dojah from 'react-dojah'
import {Box, CloseButton} from '@chakra-ui/react';
import {useAppSelector} from "../../../../../../redux/store";

interface DojahVerificationTemplateProps {
    onVerificationComplete: () => void;
    onBack: () => void;
}

const DojahVerificationTemplate: React.FC<DojahVerificationTemplateProps> = ({
                                                                                 onVerificationComplete,
                                                                                 onBack
                                                                             }) => {

    const {customerDetails} = useAppSelector(state => state.customer)
    // Replace these with your actual Dojah credentials from the dashboard
    const appID = process.env.DOJAH_APP_ID
    const publicKey = process.env.DOJAH_PUBLIC_KEY
    const widgetID = process.env.DOJAH_WIDGET_ID

    const type = "custom"; // Could also be "verification", "identification", etc.
    const config = {
        widget_id: widgetID,
        webhook: true, // Ensure your webhook is set up if needed
    };

    // Prepare user data – passing dob will skip the user-data page
    const userData = {
        // first_name: customerDetails.firstName || "John",
        // last_name: customerDetails.lastName || "Doe",
        dob: customerDetails.dob, // YYYY-MM-DD
        residence_country: 'NG',
        email: customerDetails.email || "",
    };

    // Prepare government data – only one of BVN or NIN should be passed based on length
    const govData = {
        nin: customerDetails.nin || "",
        bvn: '22222222222',
        dl: "",
        mobile: customerDetails.phone,
    };

    const metadata = {
        user_id: "121", // replace or dynamically set as needed
    };

    /**
     * Response callback from Dojah widget.
     * The widget sends response types such as 'begin', 'loading', 'success', 'error', and 'close'
     */
    const response = (responseType: string, data: any) => {
        console.log("Dojah response:", responseType, data);
        if (responseType === 'success' && data?.status) {
            // Verification successful – move to next step
            onVerificationComplete();
        } else if (responseType === 'error') {
            // Handle error (for example, show an error modal or log it)
            console.error("Dojah error:", data);
        }
        // You can handle other response types ('begin', 'loading', 'close') as needed
    };
    console.log({govData, userData, metadata, appID, publicKey})

    return (
        <Box pos={'relative'}>
            <CloseButton position="absolute" right={4} top={6} color="" onClick={onBack} size="md" />
            <Dojah
                response={response}
                appID={appID}
                publicKey={publicKey}
                type={type}
                config={config}
                userData={userData}
                govData={govData}
                metadata={metadata}
            />
        </Box>
    );
};

export default DojahVerificationTemplate;
