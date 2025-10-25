async function getLootboxWeapons(mintAddress) {
    const response = await fetch("/api/lootbox/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mint: mintAddress }),
    });
    const data = await response.json();
    return data;
}

async function getWeaponData(weaponId) {
    const response = await fetch(
        `https://assets.bravoready.com/br1-infinite/weapons/${weaponId}.json`,
        {
            method: "GET",
        }
    );
    const data = await response.json();
    return data;
}

async function addLootboxWeaponIds(lootboxes) {
    const result = [];
    let i = 1;
    for (const box of lootboxes) {
        try {
            const data = await getLootboxWeapons(box.mint);
            const weapons = data.weapons.map((w) => ({ id: w[1] }));

            console.log(`${i} Adding weapon IDs to ${box.mint}`);
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

const data = await addLootboxWeaponIds(lootboxes);

const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
const url = URL.createObjectURL(blob);

const a = document.createElement("a");
a.href = url;
a.download = "lootboxes-with-weapons.json";
a.click();

URL.revokeObjectURL(url);
