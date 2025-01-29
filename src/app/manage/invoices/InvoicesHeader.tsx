"use client";
import { Box, Button, TextField, Tabs, Tab, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SyntheticEvent } from "react";

const statuses = [
  "All",
  "Open",
  "Awaiting Approval",
  "Approved",
  "Processing",
  "Paid",
  "Rejected",
  "Vendor Not Found",
  "Duplicate",
  "Void",
];

type InvoicesHeaderProps = {
  filters: { search: string; status: string };
  onFilterChange: (filterName: string, value: string) => void;
  onCreateInvoice: () => void;
};

const InvoicesHeader = ({
  filters,
  onFilterChange,
  onCreateInvoice,
}: InvoicesHeaderProps) => {
  
  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    onFilterChange("status", newValue);
  };

  const StyledTabs = styled(Tabs)({
    borderBottom: "1px solid #e0e0e0",
    "& .MuiTabs-indicator": {
      backgroundColor: "#1976d2",
      fontWeight: 700,
      height: 3,
    },
  });
  
  const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(14),
    color: "rgba(0, 0, 0, 0.7)",
    "&:hover": {
      color: "#1976d2",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#1976d2",
      fontWeight: 700,
    },
  }));
  

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <StyledTabs
        value={filters.status}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="primary"
        textColor="primary"
        sx={{ width: "100%", flex: 1 }}
      >
        {statuses.map((status) => (
          <StyledTab
        key={status}
        label={status}
        value={status === "All" ? "" : status}
          />
        ))}
      </StyledTabs>
      <Box
        sx={{ display: "flex", gap: 2, alignItems: "center", width: "100%" }}
      >
        <TextField
          size="small"
          placeholder="Search by vendor..."
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
          sx={{ minWidth: 200 }}
        />

        <Box sx={{ flexGrow: 1 }} />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreateInvoice}
          sx={{
            bgcolor: "#1976d2",
            "&:hover": {
              bgcolor: "#1565c0",
            },
          }}
        >
          Create Invoice
        </Button>
        <TextField
          select
          size="small"
          value=""
          onChange={(e) => {
            const action = e.target.value;
            if (action === "create") {
              onCreateInvoice();
            }
            // Add more actions here if needed
          }}
          SelectProps={{
            native: true,
          }}
          sx={{ minWidth: 150 }}
        >
          <option value="" disabled>
            Actions
          </option>
          <option value="create">Create Invoice</option>
          <option value="delete">Delete Invoice</option>
        </TextField>
      </Box>
    </Box>
  );
};

export default InvoicesHeader;
