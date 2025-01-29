import mongoose from "mongoose";
export interface IInvoice {
  _id: mongoose.Types.ObjectId;
  vendorName: string;
  invoiceNumber: string;
  status: 'Open' | 'Awaiting Approval' | 'Approved' | 'Processing' | 
          'Paid' | 'Rejected' | 'Vendor Not Found' | 'Duplicate' | 'Void';
  netAmount: number;
  invoiceDate: Date;
  dueDate: Date;
  department: string;
  poNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IInvoiceResponse {
  success: boolean;
  data?: IInvoice | IInvoice[];
  error?: string;
  total?: number; // For pagination
  page?: number;
  limit?: number;
} 