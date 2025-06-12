const cards = document.getElementById('cards');
let count: number = 0;

function dateToMin(): number {
    const d: Date = new Date();
    return d.getMinutes() + d.getHours() * 60;
}

function timeToMin(datal, i: number): number {
    return Number(datal[i].cas.slice(0, 2)) * 60 + Number(datal[i].cas.slice(3, 5));
}

async function findActiveProgramm(datal, count: number) {
    for (let i = 0; i < datal.length; i++) {
        if (dateToMin() <= timeToMin(datal, i)) {
            return i;
        }
    }
}

async function scrollToTime(datal, count: number): Promise<void> {
    const i = await findActiveProgramm(datal, count);
    window.location.href = `#${i}`;
}

async function loadData(tvProgram: number) {
    const url: string = `/ct/${tvProgram}`;

    try {
        const data = await fetch(url);
        const datal = await data.json();
        let programs = '';
        datal.forEach((card, index: number) => {
            if (JSON.stringify(card.noticka) === '{}') {
                card.noticka = ''
            }
            const minutes = card.stopaz.slice(0, 3).replace(/^0+/, '');
            programs += `
                    <h4 id="${index}">${card.cas}</h4>             
                    <div class="card">
                        <img class="miniatur" src="${card.obrazky.nahled}" onerror="this.style.display='none'">
                        <h5>${card.nazvy.nazev}</h5>
                        <h6>${minutes} min</h6>
                        <p class="description">${card.noticka}</p>
                    </div>
                `
            count = index;
        });

        return programs;
    } catch (error) {
        console.error(error);
    }
}

async function createMultiplePrograms() {
    const tvPrograms: number[] = [1, 2, 24, 4, 5, 6];

    for (const program of tvPrograms) {
        const data = await loadData(program);
        const programHTML = document.createElement("div");

        programHTML.className = "col-md";
        programHTML.id = "card";
        programHTML.innerHTML = `<div class="col-md" id="card"></div>`;
        programHTML.children[0].innerHTML += data;

        cards?.appendChild(programHTML);
    }
}

(async () => {
    // let datal = await loadData();
    // await scrollToTime(datal, count);
    await createMultiplePrograms();
})();