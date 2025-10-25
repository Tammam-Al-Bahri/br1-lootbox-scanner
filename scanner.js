// loot box mint example:
// AgFU7e7yKnmv7HQMb5aDM7AiT5DSd26ueNdhH8azDi6F

// weapon id example:
// 5139

async function getLootboxWeapons(mintAddress) {
    const resp = await fetch("/api/lootbox/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mint: mintAddress }),
    });
    const data = await resp.json();
    console.log(data);
}

async function getWeaponData(weaponId) {
    const resp = await fetch(
        `https://assets.bravoready.com/br1-infinite/weapons/${weaponId}.json`,
        {
            method: "GET",
        }
    );
    const data = await resp.json();
    console.log(data);
}


