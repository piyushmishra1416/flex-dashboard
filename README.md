# Finify - Dashboard

A modern invoice management dashboard built with Next.js 14, TypeScript, and MongoDB. The platform provides a clean interface for managing invoices and vendors.

![Finify Platform](public/finify_logo.png)

## Implemented Features

- 📊 Interactive Dashboard
  - Overview cards with key metrics
  - Total invoices count
  - Active vendors tracking
  - Monthly spend analysis
  - Growth rate indicators

- 📑 Invoice Management
  - View all invoices in a data grid
  - Filter invoices by status (Open, Awaiting Approval, Approved, etc.)
  - Search invoices by vendor name
  - Edit invoice details inline
  - Delete invoices
  - Responsive table design

- 👥 Basic Vendor Management
  - View vendor list
  - Track vendor status
  - View vendor categories
  - Monitor vendor spend

- ⚙️ Settings Interface
  - Notification preferences
  - Company information form
  - Email settings

## Tech Stack

- **Frontend:**
  - Next.js 14 (App Router)
  - TypeScript
  - Material-UI (MUI)
  - TailwindCSS

- **Backend:**
  - MongoDB
  - Next.js API Routes
  - Mongoose ODM

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

## Current Functionality

### Landing Page
- Modern, responsive design
- Quick access to dashboard
- Integration showcase section

### Dashboard
- Key metrics display
- Responsive layout
- Navigation sidebar

### Invoice Management
- Status-based filtering
- Vendor search
- Inline editing
- Pagination
- Responsive data grid

### Settings
- Toggle switches for notifications
- Company information form
- Basic preferences

## Deployment

The project is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import project to Vercel
3. Add your MongoDB URI to environment variables
4. Deploy

## License

This project is licensed under the MIT License.
