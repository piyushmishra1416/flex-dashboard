"use client";
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter();

  const handleDemoClick = () => {
    router.push('/manage/invoices');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 max-w-7xl mx-auto gap-4 sm:gap-0">
        <Image
          src="/finify_logo.png"
          alt="Finifi Logo"
          width={120}
          height={40}
          className="object-contain"
        />
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          <div className="relative group">
            <button className="flex items-center gap-1 text-gray-700">
              Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <a href="#" className="text-gray-700">
            Resources
          </a>
          <button
            onClick={handleDemoClick}
            className="px-6 py-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors whitespace-nowrap"
          >
            Try Now
          </button>
          <a href="#" className="text-gray-700">
            Log in
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-20 pb-8 sm:pb-16 text-center">
        <p className="text-gray-900 text-lg sm:text-xl mb-4 sm:mb-6">
          The <span className="font-semibold">AI AP platform</span> that will
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 sm:mb-8">
          never miss your invoices.
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12">
          Get all the invoices directly from your emails and maximize your profit by optimizing spends and building
          controls
        </p>
        <button
          onClick={handleDemoClick}
          className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-lg"
        >
          Try Now
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Integration Logos */}
        <div className="mt-12 sm:mt-20">
          <p className="text-gray-600 mb-6 sm:mb-8">perfectly works with your stack:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center px-4">
            <Image
              src="/oracle_icon.png"
              alt="Oracle"
              width={100}
              height={35}
              className="opacity-70 hover:opacity-100 transition-opacity max-w-[120px] w-full"
            />
            <Image
              src="/dynamics.png"
              alt="Microsoft Dynamics"
              width={100}
              height={35}
              className="opacity-70 hover:opacity-100 transition-opacity max-w-[120px] w-full"
            />
            <Image
              src="/sap.png"
              alt="SAP"
              width={100}
              height={35}
              className="opacity-70 hover:opacity-100 transition-opacity max-w-[120px] w-full"
            />
            <Image
              src="/zoho.png"
              alt="Zoho"
              width={100}
              height={35}
              className="opacity-70 hover:opacity-100 transition-opacity max-w-[120px] w-full"
            />
            <Image
              src="/quickbook.png"
              alt="Quickbooks"
              width={100}
              height={35}
              className="opacity-70 hover:opacity-100 transition-opacity max-w-[120px] w-full"
            />
            <Image
              src="/tally.png"
              alt="Tally"
              width={100}
              height={35}
              className="opacity-70 hover:opacity-100 transition-opacity max-w-[120px] w-full"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

