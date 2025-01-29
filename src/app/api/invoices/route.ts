import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongoDb';
import Invoice from '@/app/models/Invoice';
import { IInvoice, IInvoiceResponse } from '@/types/invoice';

export async function GET(
  request: NextRequest
): Promise<NextResponse<IInvoiceResponse>> {
  try {
    await connectToDatabase();
    
    // Get search and filter params
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};
    
    if (status) {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { vendorName: { $regex: search, $options: 'i' } },
        { invoiceNumber: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const [invoices, total] = await Promise.all([
      Invoice.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Invoice.countDocuments(query)
    ]);
    
    return NextResponse.json({ 
      success: true, 
      data: invoices,
      total,
      page,
      limit
    });
  } catch (error) {
    console.error('Failed to fetch invoices:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<IInvoiceResponse>> {
  try {
    const body = await request.json();
    
    await connectToDatabase();
    const invoice = await Invoice.create(body);
    
    return NextResponse.json(
      { success: true, data: invoice },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
} 