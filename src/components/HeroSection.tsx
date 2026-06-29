import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-blue-25 to-green-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 sm:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                Hawassa Community Fund
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Together for a Better Hawassa
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Support community-driven initiatives that improve lives, strengthen public spaces, and bring hope to Hawassa City.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#donate"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Donate with AfroPay
              </a>
              <a
                href="#impact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                See the Impact
              </a>
            </div>
          </div>

          {/* Right side - Image placeholder */}
          <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-green-400 flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <div className="text-6xl">🏙️</div>
                <p className="text-lg font-semibold">Hawassa City</p>
                <p className="text-sm opacity-90">Lake · Community · Hope</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress snippet */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="text-gray-500 text-sm font-semibold uppercase">Raised</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">ETB 1.2M</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="text-gray-500 text-sm font-semibold uppercase">Goal</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">ETB 5M</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="text-gray-500 text-sm font-semibold uppercase">Donors</p>
            <p className="text-3xl font-bold text-green-600 mt-2">842</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </section>
  );
}
