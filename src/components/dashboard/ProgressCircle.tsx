
import React from 'react';

interface ProgressCircleProps {
  percentage: number;
  size: number;
  strokeWidth: number;
}

export const ProgressCircle = ({ percentage, size, strokeWidth }: ProgressCircleProps) => {
  // Calculate various parameters for the circle
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background circle */}
      <circle
        className="stroke-muted"
        fill="none"
        strokeWidth={strokeWidth}
        cx={size / 2}
        cy={size / 2}
        r={radius}
      />
      
      {/* Progress circle */}
      <circle
        className="stroke-primary transition-all duration-300 ease-in-out"
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        cx={size / 2}
        cy={size / 2}
        r={radius}
      />
      
      {/* Percentage text */}
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        className="text-xs font-medium fill-foreground"
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
};
