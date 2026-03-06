const formCadastro = document.getElementById("autorForm");
const apiURL = "http://localhost:5151/api/Autores"

const divCards = document.getElementById("cards");

async function buscarAutores() {
    try{
        const resposta = await fetch(apiURL);
        if(!resposta.ok){
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        const dados = await resposta.json();
        divCards.innerHTML = "";
        dados.forEach((dado) => {
            console.log("teste")
            //Criar elementos HTML para exibir os dados
            let card = document.createElement("div");
            card.innerHTML = `<h2>${dado.nome}</h2>
            <p>Biografia: ${dado.biografia}</p>`;
            divCards.appendChild(card);
        });
    } catch (error){
        console.log("Erro ao buscar os dados:", error);
    }
}

async function cadastrarAutor(event){
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const biografia = document.getElementById("biografia").value;
    const porcentagem = document.getElementById("porcentagem").value;
    const endereco = document.getElementById("endereco").value;
    try{
        const resposta = await fetch(apiURL, {
            method: "POST", 
            headers:{
                "Content-Type" : "application/json" 
            },
            body: JSON.stringify({
                nome: nome,
                biografia: biografia,
                porcentagemDeRoyalties: porcentagem,
                enderecoPessoal: endereco
            })
        });
        console.log("Resposta da API:", resposta)
        if(!resposta.ok){
            throw new Error ("Erro ao cadastrar o autor");
        }
        
        const dados = await resposta.json();
        
        const selectAutor = document.getElementById("autor");
        selectAutor.innerHTML = "<option value = ''>Selecione um autor </option>";
        dados.forEach((dado) => {
            const option = document.createElement("option");
            option.value =dado.id;
            option.textContent = dado.nome;
            selectAutor.appendChild(option);
        });

        console.log("Autor cadastrado com sucesso:", dados);
        formCadastro.reset();
        await buscarAutores();
    } catch(error){
        console.log("Erro ao cadastrar o autor:", error);
    }
}
formCadastro.addEventListener("submit", cadastrarAutor);
buscarAutores();

listarAutoresSelect();