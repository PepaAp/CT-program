"use strict";
const card = document.getElementById('card');
async function loadData() {
    const url = "/ct";
    try {
        const data = await fetch(url);
        const datal = await data.json();
        console.log(datal);
        let programs = '';
        datal.forEach((card) => {
            const minutes = card.stopaz.slice(0, 3).replace(/^0+/, '');
            programs += `
                    <h4>${card.cas}</h4>             
                    <div class="card">
                        <img class="miniatur" src="${card.obrazky.nahled}" onerror="this.style.display='none'">
                        <h5>${card.nazvy.nazev}</h5>
                        <h6>${minutes} min</h6>
                        <p class="description">${card.noticka}</p>
                    </div>
                `;
        });
        if (card) {
            card.innerHTML = programs;
        }
    }
    catch (error) {
        console.error(error);
    }
}
loadData();
