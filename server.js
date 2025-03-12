require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Function to fetch top 20 cryptocurrencies dynamically
const fetchTopCryptoPrices = async () => {
    try {
        // Step 1: Fetch Top 20 Coin IDs
        const coinsResponse = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
                params: {
                    vs_currency: "usd",
                    order: "market_cap_desc",
                    per_page: 20,
                    page: 1,
                    sparkline: false,
                },
            }
        );

        const coinIds = coinsResponse.data.map((coin) => coin.id).join(",");

        // Step 2: Fetch Prices of Those Coins
        const pricesResponse = await axios.get(
            "https://api.coingecko.com/api/v3/simple/price",
            {
                params: {
                    ids: coinIds,
                    vs_currencies: "usd",
                    include_market_cap: true,
                    include_24hr_change: true,
                },
            }
        );

        return pricesResponse.data;
    } catch (error) {
        console.error("Error fetching crypto prices:", error.message);
        return null;
    }
};

// API endpoint to fetch top 20 crypto prices
app.get("/crypto-prices", async (req, res) => {
    try {
        const data = await fetchTopCryptoPrices();
        if (!data) {
            return res.status(500).json({ error: "Failed to fetch crypto prices" });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
