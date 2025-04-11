'use client';

import React, {useEffect, useState} from 'react';
// @ts-ignore
import Dojah from 'react-dojah'
import {Box, CloseButton, useToast} from '@chakra-ui/react';
import {useAppSelector} from "../../../../../../redux/store";

interface DojahVerificationTemplateProps {
    onVerificationComplete: () => void;
    onBack: () => void;
}

const DojahVerificationTemplate: React.FC<DojahVerificationTemplateProps> = ({
                                                                                 onVerificationComplete,
                                                                                 onBack
                                                                             }) => {

    const toast = useToast()

    const {customerDetails} = useAppSelector(state => state.customer)


    // Workaround: Override document.head.removeChild to suppress errors
    useEffect(() => {
        const originalRemoveChild = document.head.removeChild;
        // @ts-ignore
        document.head.removeChild = function (child: Node) {
            try {
                return originalRemoveChild.call(document.head, child);
            } catch (e) {
                console.warn('Suppressed removeChild error:', e);
                return child;
            }
        };
        return () => {
            document.head.removeChild = originalRemoveChild;
        };
    }, []);

    // Replace these with your actual Dojah credentials from the dashboard
    const appID = process.env.NEXT_PUBLIC_DOJAH_APP_ID
    const publicKey = process.env.NEXT_PUBLIC_DOJAH_PUBLIC_KEY
    const widgetID = process.env.NEXT_PUBLIC_DOJAH_WIDGET_ID

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
        user_id: customerDetails?.id,
        userId: customerDetails?.id,
    };


    /**
     * Response callback from Dojah widget.
     * The widget sends response types such as 'begin', 'loading', 'success', 'error', and 'close'
     */
    const response = (responseType: string, data: any) => {
        console.log("Dojah response:", responseType, data);
        if (responseType === 'success') {
            // Verification successful – move to next step
            onVerificationComplete();

            return
        }

        if (responseType === 'error') {
            // Handle error (for example, show an error modal or log it)
            console.error("Dojah error:", data);
            toast({
                title: "Verification Error",
                description: data.message || "An error occurred during verification.",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            onBack()

            return
        }

        if(responseType === 'close') {
            // Handle close event
        }

        // You can handle other response types ('begin', 'loading', 'close') as needed
    };
    console.log({govData, userData, metadata, appID, publicKey})

    // if (isClosed) return <Box />;

    return (
        <Box>
            {/*<CloseButton zIndex={9999999} position="absolute" right={4} top={6} color="" onClick={handleClose} size="md" />*/}
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
