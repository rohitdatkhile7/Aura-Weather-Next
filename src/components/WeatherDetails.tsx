// components/WeatherDetails.tsx
"use client";

interface WeatherDetail {
  icon: string;
  label: string;
  value: string;
  color: string;
}

interface WeatherDetailsProps {
  details: WeatherDetail[];
}

export default function WeatherDetails({ details }: WeatherDetailsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center mt-8">
      {details.map((detail, index) => (
        <div
          key={index}
          className="glass-item p-4 transition-all duration-300 hover:scale-105"
        >
          <i className={`${detail.icon} ${detail.color} mb-2 text-2xl`}></i>
          <h5 className="text-sm text-white/80 mb-1">{detail.label}</h5>
          <p className="font-bold text-lg">{detail.value}</p>
        </div>
      ))}
    </div>
  );
}