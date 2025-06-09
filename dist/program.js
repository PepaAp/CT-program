"use strict";
async function loadData() {
    const url = "/ct";
    const data = await fetch(url);
    console.log(data);
}
loadData();
