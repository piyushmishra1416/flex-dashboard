import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongoDb';
import Invoice from '@/app/models/Invoice';
import { IInvoiceResponse } from '@/types/invoice';

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

    interface IInvoiceQuery {
      vendorName?: { $regex: string; $options: string };
      invoiceNumber?: { $regex: string; $options: string };
    }
    
    const query: Record<string, any> = {};
    
    if (status) {
      query.status = status;
    }
    
    if (search) {
      const orConditions: IInvoiceQuery[] = [];
    
      if (searchParams.get('search')) {
        orConditions.push({
          vendorName: { $regex: search, $options: 'i' }
        });
      }
    
      if (searchParams.get('search')) {
        orConditions.push({
          invoiceNumber: { $regex: search, $options: 'i' }
        });
      }
    
      if (orConditions.length > 0) {
        query.$or = orConditions;
      }
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
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch invoices' },
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
      { success: false, error: error instanceof Error ? error.message : 'Failed to create invoice' },
      { status: 500 }
    );
  }
} 