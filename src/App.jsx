import StockChart from "./components/StockChart";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import StockCard from "./components/StockCard";

import "./App.css";

function App() {

  const [search, setSearch] = useState("");

  const [stocks, setStocks] = useState([]);

  const [watchlist, setWatchlist] = useState([]);

  const [loading, setLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  const [selectedStock, setSelectedStock] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {

    setTimeout(() => {

      const stockData = [
        {
          name: "Reliance",
          price: "₹2,850",
          change: "+1.25%",
          positive: true,
        },

        {
          name: "TCS",
          price: "₹3,950",
          change: "-0.45%",
          positive: false,
        },

        {
          name: "Infosys",
          price: "₹1,480",
          change: "+0.80%",
          positive: true,
        },

        {
          name: "HDFC Bank",
          price: "₹1,650",
          change: "-0.20%",
          positive: false,
        },
      ];

      setStocks(stockData);

      setLoading(false);

    }, 2000);

  }, []);
  useEffect(() => {

    const savedWatchlist = JSON.parse(
      localStorage.getItem("watchlist")
    );

    if (savedWatchlist) {
      setWatchlist(savedWatchlist);
    }

  }, []);

  function addToWatchlist(stock) {

    const alreadyExists = watchlist.some(
      (item) => item.name === stock.name
    );

    if (alreadyExists) {
      alert("Stock already in watchlist!");
      return;
    }

    const updatedWatchlist = [...watchlist, stock];

    setWatchlist(updatedWatchlist);

    localStorage.setItem(
      "watchlist",
      JSON.stringify(updatedWatchlist)
    );
  }

  function removeFromWatchlist(stockName) {

    const updatedWatchlist = watchlist.filter(
      (stock) => stock.name !== stockName
    );

    setWatchlist(updatedWatchlist);

    localStorage.setItem(
      "watchlist",
      JSON.stringify(updatedWatchlist)
    );
  }

  const filteredStocks = stocks.filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }


  return (
    <div className={darkMode ? "dark" : ""}>


      <Navbar />

      <div className="container">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />
        <button
          className="dark-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {selectedStock && (
          <div>
            <h2>{selectedStock.name} Chart</h2>
            <StockChart stock={selectedStock} />
          </div>
        )}

        <div className="market-box">

          <h2>Market Overview</h2>

          <div className="market-data">

            <div>
              <h3>NIFTY 50</h3>
              <p>24,350 +0.55%</p>
            </div>

            <div>
              <h3>SENSEX</h3>
              <p>79,800 +0.42%</p>
            </div>

          </div>

        </div>

        <h2 className="stock-heading">
          Top Indian Stocks
        </h2>

        <div className="stock-grid">

          {filteredStocks.map((stock, index) => (
            <StockCard
              key={index}
              stock={stock}
              addToWatchlist={addToWatchlist}
              setSelectedStock={setSelectedStock}
              setModalOpen={setModalOpen}
            />
          ))}

        </div>

        <h2
          id="watchlist"
          className="stock-heading"
        >
          My Watchlist
        </h2>

        <div className="stock-grid">

          {watchlist.map((stock, index) => (
            <StockCard
              key={index}
              stock={stock}
              removeFromWatchlist={removeFromWatchlist}
              setSelectedStock={setSelectedStock}
              setModalOpen={setModalOpen}
            />
          ))}
          {selectedStock && (

            <div className="modal-overlay">

              <div className="modal">

                <h2>{selectedStock.name}</h2>

                <p>Price: {selectedStock.price}</p>

                <p>
                  Change: {selectedStock.change}
                </p>

                <p>
                  Status:
                  {selectedStock.positive
                    ? " Bullish"
                    : " Bearish"}
                </p>

                <button
                  onClick={() => setSelectedStock(null)}
                >
                  Close
                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default App;