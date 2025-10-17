import React from "react";

interface DetailedInsightsProps {
  onNavigateToOverview: () => void;
}

const DetailedInsights: React.FC<DetailedInsightsProps> = ({
  onNavigateToOverview,
}) => {
  return (
    <div className='detailed-insights-page'>
      <header>
        <h1>Detailed Insights</h1>
        <button onClick={onNavigateToOverview}>← Back to Overview</button>
      </header>
    </div>
  );
};

export default DetailedInsights;
