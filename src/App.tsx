import { useState } from "react";
import Overview from "./pages/Overview";
import "./App.css";

type Page = "overview" | "detailed-insights";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("overview");

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "overview":
        return (
          <Overview
            onNavigateToDetailed={() => navigateToPage("detailed-insights")}
          />
        );

      case "detailed-insights":
        return <div>Detailed Insights Page</div>;
      default:
        return <div>No Page Found</div>;
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
