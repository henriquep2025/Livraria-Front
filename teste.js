async function carregarAutores(params) {
    try{
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error("Falha ao carregar abrigos");

        const abrigos = await response.json();
        //Aqui vai o resto do código
    } catch (error) {
        console.error(error);
    }
}