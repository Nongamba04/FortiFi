export const fetchCrypto = async () => {
    try {
        const response = await fetch("http://localhost:5000/crypto-prices");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching crypto data:", error);
        return null;
    }
};
