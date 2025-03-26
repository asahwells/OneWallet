export interface PendingTableProps {
    data: {
      sn: number;
      name: string;
      tier: string;
      accountNumber: string;
      approvalType: string;
      date: string;
    }[];
    id?: any;
  }
export enum TransactionStatus {
    PENDING = 'Pending',
    SUCCESSFUL = 'Successful',
    FAILED = 'Failed',
    REFUNDED = 'Refunded'
}

export type Transaction = {
    id: string;
    date: string;
    amount: string;
    currency: string;
    narration: string;
    status: TransactionStatus;
    type: string;
}

export interface TransactionTableProps {
    transactions: Transaction[];
    isLoading: boolean;
}

