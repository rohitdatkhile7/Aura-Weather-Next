// components/SkeletonLoader.tsx
export function CurrentWeatherSkeleton() {
  return (
    <div className="glass-container max-w-6xl mx-auto p-6 md:p-8 mb-6 fade-in">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        {/* Location Skeleton */}
        <div className="w-full lg:w-1/2">
          <div className="skeleton-loader h-12 w-3/5 mb-4"></div>
          <div className="skeleton-loader h-6 w-2/5 mb-6"></div>
          <div className="flex gap-4">
            <div className="skeleton-loader h-8 w-32 rounded-full"></div>
            <div className="skeleton-loader h-8 w-32 rounded-full"></div>
          </div>
        </div>

        {/* Temp & Icon Skeleton */}
        <div className="w-full lg:w-1/2 flex items-center justify-center gap-6">
          <div className="skeleton-loader w-24 h-24 rounded-2xl"></div>
          <div>
            <div className="skeleton-loader h-20 w-36 mb-3"></div>
            <div className="skeleton-loader h-4 w-24"></div>
          </div>
        </div>
      </div>

      {/* Weather Details Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton-loader h-28 rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}

export function HourlyForecastSkeleton() {
  return (
    <div className="glass-container max-w-6xl mx-auto p-6 md:p-8 mb-6 fade-in">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <i className="fas fa-clock mr-2"></i> Hourly Forecast
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="skeleton-loader h-36 w-24 flex-shrink-0 rounded-2xl"
          ></div>
        ))}
      </div>
    </div>
  );
}

export function DailyForecastSkeleton() {
  return (
    <div className="glass-container max-w-6xl mx-auto p-6 md:p-8 mb-6 fade-in">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <i className="fas fa-calendar-week mr-2"></i> 5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton-loader h-40 rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}