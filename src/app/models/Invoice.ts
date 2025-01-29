import mongoose, { Schema } from "mongoose";
import { IInvoice } from "@/types/invoice";

const InvoiceSchema = new Schema<IInvoice>(
  {
    vendorName: {
      type: String,
      required: [true, "Vendor name is required"],
      trim: true,
      index: true,
    },
    invoiceNumber: {
      type: String,
      required: [true, "Invoice number is required"],
      unique: true,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "Open",
        "Awaiting Approval",
        "Approved",
        "Processing",
        "Paid",
        "Rejected",
        "Vendor Not Found",
        "Duplicate",
        "Void",
      ],
      default: "Open",
    },
    netAmount: {
      type: Number,
      required: [true, "Net amount is required"],
      min: 0,
    },
    invoiceDate: {
      type: Date,
      required: [true, "Invoice date is required"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    poNumber: {
      type: String,
      required: [true, "PO Number is required"],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

InvoiceSchema.index({ vendorName: "text", invoiceNumber: "text" });

export default mongoose.models.Invoice ||
  mongoose.model<IInvoice>("Invoice", InvoiceSchema);
