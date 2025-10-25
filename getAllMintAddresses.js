const API_KEY = "YOUR_HELIUS_API_KEY";

// creator address for the nft collection, found in nft metadata
const CREATOR = "5dZuTXWwwJZMr1LuZpYsURf3bgK5PsrYD31J5m31TupV";

const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        jsonrpc: "2.0",
        id: "nfts",
        method: "getAssetsByCreator",
        params: {
            creatorAddress: CREATOR,
            onlyVerified: true,
            page: 1,
            limit: 10000,
        },
    }),
});

const data = await response.json();
const mints = data.result.items.map((i) => i.id);
console.log("Mint addresses:", mints);
