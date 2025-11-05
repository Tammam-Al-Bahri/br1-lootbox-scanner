async function getLootboxWeapons(mintAddress) {
    const response = await fetch("/api/lootbox/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mint: mintAddress }),
    });
    const data = await response.json();
    return data;
}

const ogWeaponsEndpoint = "https://assets.bravoready.com/br1-infinite/weapons/";
const slashersWeaponsEndpoint = "https://assets.bravoready.com/br1-infinite/weapons-v2/";

async function getWeaponData(weaponId) {
    const response = await fetch(`${slashersWeaponsEndpoint}${weaponId}.json`, {
        method: "GET",
    });
    const data = await response.json();
    return data;
}

async function buildLootboxDataWithWeaponRarity(lootboxes) {
    const result = [];
    let i = 1;
    for (const box of lootboxes) {
        try {
            const data = await getLootboxWeapons(box.mint);
            console.log(`${i} Adding weapon IDs and rarities to ${box.mint}`);
            const weapons = await Promise.all(
                data.weapons.map(async (w) => {
                    const id = w[1];
                    const weaponData = await getWeaponData(id);
                    const type = weaponData.attributes?.[0]?.value || "Unknown";
                    return { id, type };
                })
            );
            result.push({
                lootbox: box.mint,
                weapons,
            });
            i++;
        } catch (error) {
            console.log(error);
        }
    }

    return result;
}

const lootboxes = [
    { mint: "MINT ADDRESS 1" },
    { mint: "MINT ADDRESS 2" },
    { mint: "MINT ADDRESS 3" },
    { mint: "..." },
];

const data = await buildLootboxDataWithWeaponRarity(lootboxes);

const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
const url = URL.createObjectURL(blob);

const a = document.createElement("a");
a.href = url;
a.download = "lootboxes-with-weapon-data.json";
a.click();

URL.revokeObjectURL(url);
