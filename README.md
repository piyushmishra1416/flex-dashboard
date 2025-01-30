# Finify - Dashboard

A modern invoice management dashboard built with Next.js 14, TypeScript, and MongoDB. The platform provides a clean interface for managing invoices and vendors.

![Finify Platform](public/finify_logo.png)

## Implemented Features


-  Invoice Management
   - View all invoices in a data grid
   - Filter invoices by status (Open, Awaiting Approval, Approved, etc.)
   - Search invoices by vendor name
   - Edit invoice details inline
   - Delete invoices
   - Responsive table design

## Tech Stack

- **Frontend:**
  - Next.js 14 (App Router)
  - TypeScript
  - Material-UI (MUI)
  - TailwindCSS

- **Backend:**
  - MongoDB
  - Next.js API Routes
  - Mongoose 

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/finify.git
cd finify
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
finify/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── invoices/  # Invoice CRUD operations
│   │   ├── components/
│   │   │   └── MainLayout.tsx  # Main dashboard layout
│   │   ├── manage/
│   │   │   ├── invoices/   # Invoice management
│   │   │   ├── vendors/    # Vendor list view
│   │   │   └── setting/    # Settings page
│   │   └── models/
│   │       └── Invoice.ts  # MongoDB schema
│   └── types/
└── public/
```

## API Endpoints

### Invoices
- `GET /api/invoices` - Get all invoices with pagination and filters
- `POST /api/invoices` - Create new invoice
- `PUT /api/invoices/[id]` - Update invoice
- `DELETE /api/invoices/[id]` - Delete invoice


## Deployment

The project is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import project to Vercel
3. Add your MongoDB URI to environment variables
4. Deploy

