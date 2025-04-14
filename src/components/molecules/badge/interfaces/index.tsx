
type StatusType = 'Successful' | 'Pending' | 'Failed' | string;

export interface StatusBadgeProps {
  status: StatusType;
}