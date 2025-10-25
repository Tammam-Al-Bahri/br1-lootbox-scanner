async function getLootboxWeapons(mintAddress) {
    const response = await fetch("/api/lootbox/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mint: mintAddress }),
    });
    const data = await response.json();
    console.log(data);
}

async function getWeaponData(weaponId) {
    const response = await fetch(
        `https://assets.bravoready.com/br1-infinite/weapons/${weaponId}.json`,
        {
            method: "GET",
        }
    );
    const data = await response.json();
    console.log(data);
}
