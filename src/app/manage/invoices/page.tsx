"use client";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import InvoicesHeader from "./InvoicesHeader";
import InvoicesTable from "./InvoicesTable";
import CreateInvoiceModal from "./CreateInvoiceModal";
import { IInvoice } from "@/types/invoice";
import axios from "axios";

const InvoicesPage = () => {
  const [filters, setFilters] = useState({ search: "", status: "" });
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const fetchInvoices = async () => {
    try {
      console.log("invoices", invoices);
      setLoading(true);
      const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(filters.search && { search: filters.search }),
        ...(filters.status && { status: filters.status }),
      });

      const response = await axios.get(`/api/invoices?${searchParams}`);
      const data = response.data;

      if (data.success) {
        setInvoices(data.data);
        setTotalRows(data.total || 0);
      }
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [filters, page]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    setPage(1); // Reset to first page when filters change
  };

  const handleCreateInvoice = async (invoice: Partial<IInvoice>) => {
    try {
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoice),
      });

      const data = await response.json();
      if (data.success) {
        fetchInvoices(); // Refresh the list
      }
    } catch (error) {
      console.error("Failed to create invoice:", error);
    }
  };

  return (
    <Box sx={{ height: "100%", width: "100%", p: 2 }}>
      <InvoicesHeader
        filters={filters}
        onFilterChange={handleFilterChange}
        onCreateInvoice={() => setOpenCreateModal(true)}
      />

      <InvoicesTable
        data={invoices}
        loading={loading}
        page={page}
        onPageChange={setPage}
        totalRows={totalRows}
        onRefresh={fetchInvoices}
      />

      <CreateInvoiceModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onSubmit={handleCreateInvoice}
      />
    </Box>
  );
};

export default InvoicesPage;
