export interface IUserInfoCard {
    name: string,
    status: string,
    activePath: string;
    id?: any;
    setActivePath : (path : string) => void
}

export interface IImageCardProps {
    src?: string;
    onRemove?: () => void;
    onView?: () => void;
  }


export interface IKycComplianceCard {
pendingApproval : string
    suspendedUsers : string
}