"use client";
import { Box, Chip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IInvoice } from "@/types/invoice";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";

interface InvoicesTableProps {
  data: IInvoice[];
  loading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  totalRows: number;
  onRefresh: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "#4caf50";
    case "Awaiting Approval":
      return "#ff9800";
    case "Rejected":
      return "#f44336";
    case "Processing":
      return "#2196f3";
    default:
      return "#757575";
  }
};

const getCityFromPostalCode = async (postalCode: string) => {
  try {
    const response = await axios.get(
      `https://api.zippopotam.us/IN/${postalCode}`
    );
    return response.data.places?.[0]?.["place name"] || "Unknown City";
  } catch (error) {
    return "Unknown City";
  }
};
const columns: GridColDef[] = [
  {
    field: "vendorName",
    headerName: "Vendor Name",
    width: 200,
    renderCell: (params: GridRenderCellParams) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          whiteSpace: "normal",
          wordBreak: "break-word",
          lineHeight: "1.5",
          height: "100%",
        }}
      >
        {params.value}
      </Box>
    ),
  },
  {
    field: "invoiceNumber",
    headerName: "Invoice",
    width: 200,
    renderCell: (params: GridRenderCellParams) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          whiteSpace: "normal",
          wordBreak: "break-word",
          lineHeight: "1.5",
          height: "100%",
        }}
      >
        {params.value}
      </Box>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={params.value}
        sx={{
          bgcolor: getStatusColor(params.value),
          color: "white",
          width: "200px",
        }}
      />
    ),
  },
  {
    field: "netAmount",
    headerName: "Net Amount",
    width: 200,
  },
  {
    field: "invoiceDate",
    headerName: "Invoice Date",
    width: 200,
    valueGetter: (params) => dayjs(params).format("YYYY-MM-DD"),
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 200,
    valueGetter: (params) => dayjs(params).format("YYYY-MM-DD"),
  },
  {
    field: "department",
    headerName: "Department",
    width: 200,
  },
  {
    field: "poNumber",
    headerName: "Cost Center",
    width: 200,
    renderCell: (params: any) => {
      const [city, setCity] = useState("Loading...");

      useEffect(() => {
        getCityFromPostalCode(params.value).then(setCity);
      }, [params.value]);

      return <span>{city}</span>;
    },
  },
];

export default function InvoicesTable({
  data,
  loading,
  page,
  onPageChange,
  totalRows,
  onRefresh,
}: InvoicesTableProps) {
  return (
    <Box
      sx={{
        height: "calc(100vh - 200px)",
        width: "100%",
        mt: 2,
        overflowX: "auto",
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        loading={loading}
        rowCount={totalRows}
        paginationMode="server"
        paginationModel={{ page: page - 1, pageSize: 10 }}
        onPaginationModelChange={(model) => onPageChange(model.page + 1)}
        pageSizeOptions={[10]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={(row) => row._id}
      />
    </Box>
  );
}
