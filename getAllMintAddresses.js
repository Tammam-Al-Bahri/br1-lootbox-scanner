const API_KEY = "YOUR_HELIUS_API_KEY"; // can get this for free https://www.helius.dev/
const CREATOR = "5dZuTXWwwJZMr1LuZpYsURf3bgK5PsrYD31J5m31TupV"; // creator address for the nft collection, found in nft metadata

const PAGE_LIMIT = 1000; // max allowed by helius
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

let allNFTs = [];
let seenMints = new Set();

async function delay(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

async function fetchPage(page) {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const res = await fetch(`https://mainnet.helius-rpc.com/?api-key=${API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    id: `page-${page}`,
                    method: "getAssetsByCreator",
                    params: {
                        creatorAddress: CREATOR,
                        onlyVerified: false,
                        page,
                        limit: PAGE_LIMIT,
                    },
                }),
            });

            const data = await res.json();
            const items = data?.result?.items || [];

            if (items.length === 0) {
                console.warn(`Empty or end of data at page ${page}`);
                return [];
            }

            console.log(`Page ${page}: fetched ${items.length} NFTs`);
            return items;
        } catch (err) {
            console.error(`Error on page ${page}, attempt ${attempt}:`, err);
            if (attempt < MAX_RETRIES) {
                console.log(`Retrying page ${page} after ${RETRY_DELAY}ms...`);
                await delay(RETRY_DELAY);
            } else {
                console.error(`Page ${page} failed after ${MAX_RETRIES} retries`);
                return [];
            }
        }
    }
}

async function fetchAllNFTs() {
    console.log("Starting NFT fetch...");
    let page = 1;

    while (true) {
        const items = await fetchPage(page);
        if (!items.length) break;

        // add only unique mints
        for (const nft of items) {
            if (!seenMints.has(nft.id)) {
                seenMints.add(nft.id);
                allNFTs.push(nft);
            }
        }

        if (items.length < PAGE_LIMIT) {
            console.log("Last page reached.");
            break;
        }

        page++;
        await delay(500); // delay between pages
    }

    console.log(`Total unique NFTs fetched: ${allNFTs.length}`);

    // simplify data
    const simplified = allNFTs.map((nft) => ({
        mint: nft.id,
    }));

    // create json blob for download
    const blob = new Blob([JSON.stringify(simplified, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // trigger file download
    const a = document.createElement("a");
    a.href = url;
    a.download = "mint-addresses.json";
    a.click();

    URL.revokeObjectURL(url);

    console.log("Download complete!");
}

fetchAllNFTs();
