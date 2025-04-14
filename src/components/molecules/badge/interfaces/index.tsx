import { TransactionStatus } from '../Status/status.enum';

type StatusType = { status: TransactionStatus }

export interface StatusBadgeProps {
  status: StatusType;
}