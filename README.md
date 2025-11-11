# BR1 Loot Box & Weapon Scanner
## See what weapons are in any loot box without having to open or own it

This project provides a simple browser-based utility for scanning **BR1 Infinite** lootboxes and extracting their weapon data (IDs and *rarities*) directly from their API — without needing Node.js, an IDE, or any local setup.

---

## Overview

This tool consists of two JavaScript files:

- **`scanner.js`** — Fetches lootbox contents and weapon rarity data, and exports it to a downloadable `.json` file.  
- **`getAllMintAddresses.js`** — Retrieves all NFT mint addresses from a given Solana collection using the Helius API.

Both scripts are designed to run **directly in a browser DevTools console**.

---

## Usage (scanner.js)

### 1. Open the BR1 website (to avoid CORS / TLS / SSL issues)
(why I made it for DevTools in the first place)
Go to:

[br1game.com](https://www.br1game.com)

### 2. Open Developer Tools
- Press **F12**

### 3. Paste the entire contents of `scanner.js`
change the endpoint in the getWeaponData fetch depending on the weapon collection

### 4. Edit the lootbox list to you liking
Find this at the bottom of the script:
```js
const lootboxes = [
  { mint: "MINT ADDRESS 1" },
  { mint: "MINT ADDRESS 2" },
  { mint: "MINT ADDRESS 3" },
  { mint: "..." },
];
```
Replace the mint addresses with actual lootbox mint addresses from the BR1 Infinite collection:
[solscan.io](https://solscan.io/collection/f43093f59bcf463c0437d25b8661ab7408dac48d52589f037acea2cb7041c612)

### 5. Run the script

Once you press Enter, the script will:

- Fetch each lootbox’s contents via /api/lootbox/open

- Retrieve rarity/type data for each weapon via https://assets.bravoready.com/br1-infinite/weapons/{weaponId}.json

- Log progress in the console

- Finally download a file named ```lootboxes-with-weapon-data.json```

#### I've already done this for all the remaining loot boxes, it's included in this repository, and here's an example:

```json
[
 {
    "lootbox": "JABZ8GNu3kfpzHQmL3qMAV2JCxm1UtYGgBncKVQbwNYS",
    "weapons": [
      {
        "id": 14404,
        "type": "Common"
      },
      {
        "id": 1888,
        "type": "Common"
      },
      {
        "id": 6084,
        "type": "Ultra"
      }
    ]
  }
]
```

## Checking Individual Lootboxes or Weapons
You can also manually call the helper functions directly in the console:
```js
// Check a specific lootbox
console.log(await getLootboxWeapons("JDtJSB9bt7QhJxNP6Y3piSNb8WtKeRMDFPJQ88EFrAL1"));

// Check a specific weapon’s metadata
console.log(await getWeaponData(10164));
```
## Usage (getAllMintAddresses.js)
This optional script allows you to retrieve all mint addresses from a Solana NFT collection using the Helius API.

### Requirements

- A Helius API key (free to generate at [helius.dev](https://www.helius.dev/))

### How to use

- Open DevTools -> Console.

- Paste getAllMintAddresses.js.

- Enter your Helius API key.

- Hit enter to run.

The script will download a json file with all mint addresses for the specified creator or collection.

## Notes
- These scripts use the browser’s fetch API, so they work without any build tools or dependencies.
- Running them directly on [br1game.com](https://www.br1game.com) ensures the requests are from an allowed origin (no CORS or SSL issues).

## Built out of curiosity and for fun.
