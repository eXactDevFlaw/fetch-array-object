async function fetchAlleDaten() {
    const url = 'https://join-19b54-default-rtdb.europe-west1.firebasedatabase.app/.json';
    const res = await fetch(url);
    const daten = await res.json();
    console.log(daten)
    return daten
}

async function fetchDasWasDuBrauchst(key) {
    const url = 'https://join-19b54-default-rtdb.europe-west1.firebasedatabase.app/.json';
    const res = await fetch(url);
    const daten = await res.json();
    const wasIchBrauche = await daten[key] ;
    return wasIchBrauche
}



