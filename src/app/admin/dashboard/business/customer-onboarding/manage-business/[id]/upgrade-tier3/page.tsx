"use client";

import AddressVerificationFormTemplate from '../../../../../../../../components/templates/DashboardTemplates/CustomerOnboardingTemplate/ManageBusinessTemplate/AddressVerificationFormTemplate/index';

export default function page() {
  const handleContinue = (documentType: string, file?: File) => {
  
  };

  return (
    <AddressVerificationFormTemplate onContinue={handleContinue} />
  )
}
