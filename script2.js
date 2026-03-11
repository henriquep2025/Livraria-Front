const formLivro = document.getElementById("livroForm");
const apiURL = "http://localhost:5151/api/Livros"
const apiURL2 = "http://localhost:5151/api/Autores"
const divCards = document.getElementById("cards")

async function buscarLivros() {
    try{
        const resposta = await fetch(apiURL);
        if(!resposta.ok){
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        const dados = await resposta.json();
        // divCards.innerHTML = "";
        dados.forEach((dado) => {
            console.log("teste")
            //Criar elementos HTML para exibir os dados
            let card = document.createElement("div");
            card.innerHTML = 
            `<h2>${dado.titulo}</h2>
            <p>CódigoISBN: ${dado.codigoISBN}</p>
            <p>Preço: ${dado.precoBaseSemImpostos}</p>
            <p>AutorID: ${dado.autorId}</p>`;
            divCards.appendChild(card);
        });
    } catch (error){
        console.log("Erro ao buscar os dados:", error);
    }
}

async function cadastrarLivro(event){
    event.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const codigoISBN = document.getElementById("codigoISBN").value;
    const preco = document.getElementById("preco").value;
    const autorID = document.getElementById("autorid").value;
    try{
        const resposta = await fetch(apiURL, {
            method: "POST", 
            headers:{
                "Content-Type" : "application/json" 
            },
            body: JSON.stringify({
                titulo: titulo,
                codigoISBN: codigoISBN,
                precoBaseSemImpostos: preco,
                autorId: autorID
            })
        });
        console.log("Resposta da API:", resposta)
        if(!resposta.ok){
            throw new Error ("Erro ao cadastrar livro");
        }
        const dados = await resposta.json
        console.log("Livro cadastrado com sucesso:", dados);
        formLivro.reset();
        await buscarAutores();
    } catch(error){
        console.log("Erro ao cadastrar livro:", error);
    }
}

async function listarAutores(event){
    try{
        const resposta = await fetch(apiURL2);
        if(!resposta.ok){
            throw new Error(`Erro HTTP: ${resposta.status}`);
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
        } catch (error){
        console.log("Erro ao buscar os dados:", error);
    }
}
buscarLivros(); 

formLivro.addEventListener("submit", cadastrarLivro);
listarAutores();