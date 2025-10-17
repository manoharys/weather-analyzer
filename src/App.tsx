import { useState } from "react";
import Overview from "./pages/Overview";
import "./App.css";
import DetailedInsights from "./pages/DetailedInsights";

type Page = "overview" | "detailed-insights";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("overview");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedStart, setSelectedStart] = useState<string>("");
  const [selectedEnd, setSelectedEnd] = useState<string>("");

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
  };

  const handleGoToDetails = (loc: string, start: string, end: string) => {
    setSelectedLocation(loc);
    setSelectedStart(start);
    setSelectedEnd(end);
    navigateToPage("detailed-insights");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "overview":
        return (
          <Overview
            onNavigateToDetailed={(loc, start, end) =>
              handleGoToDetails(loc, start, end)
            }
          />
        );
      case "detailed-insights":
        return (
          <DetailedInsights
            onNavigateToOverview={() => navigateToPage("overview")}
            initialLocation={selectedLocation}
            initialStartDate={selectedStart}
            initialEndDate={selectedEnd}
          />
        );
      default:
        return (
          <Overview
            onNavigateToDetailed={() => navigateToPage("detailed-insights")}
          />
        );
    }
  };

  return (
    <div className='app'>
      <nav className='navigation'>
        <button
          className={currentPage === "overview" ? "active" : ""}
          onClick={() => navigateToPage("overview")}
        >
          Overview
        </button>
        <button
          className={currentPage === "detailed-insights" ? "active" : ""}
          onClick={() => navigateToPage("detailed-insights")}
        >
          Detailed Insights
        </button>
      </nav>

      <main className='main-content'>{renderPage()}</main>
    </div>
  );
}

export default App;
