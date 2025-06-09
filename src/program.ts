async function loadData():Promise<void> {
    const url: string = "/ct"

    const data = await fetch(url);
    console.log(data);
}

loadData();