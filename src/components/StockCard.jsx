import "../App.css";

function StockCard({
  stock,
  addToWatchlist,
  removeFromWatchlist,
  setSelectedStock,
}) {

  return (

    <div
      className="stock-card"
      onClick={() => setSelectedStock(stock)}
    >

      <h3>{stock.name}</h3>

      <p className="price">{stock.price}</p>

      <p className={stock.positive ? "green" : "red"}>
        {stock.change}
      </p>

      {addToWatchlist && (
        <button
          className="watch-btn"
          onClick={(e) => {
            e.stopPropagation();
            addToWatchlist(stock);
          }}
        >
          Add to Watchlist
        </button>
      )}

      {removeFromWatchlist && (
        <button
          className="remove-btn"
          onClick={(e) => {
            e.stopPropagation();
            removeFromWatchlist(stock.name);
          }}
        >
          Remove
        </button>
      )}

    </div>

  );
}

export default StockCard;