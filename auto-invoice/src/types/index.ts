export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}

export interface Invoice {
  id: string;
  googleDocId: string;
  fileName: string;
  amount: number;
  date: string;
  recipients: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  status: "pending" | "sent" | "failed";
}

export interface SendHistory {
  id: string;
  invoiceId: string;
  sentAt: string;
  recipients: string[];
  status: "success" | "failed";
  errorMessage?: string;
}
