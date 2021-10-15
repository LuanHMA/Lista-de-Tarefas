const ul = document.querySelector('ul');//Lista HTML
const excluidos = document.getElementById('lista-excluidos');//Lista Lixeira
const input = document.querySelector('#tarefa');//Campo do texto
const lista = [];//Guarda o texto digitado
let itensExcluidos = [];

//Configurações de agilidade
input.focus();
document.addEventListener('keypress',e=>{
    if(e.key == 'Enter'){
        document.querySelector('button#adicionar').click();
    }
})

function adicionar(){//Adiciona na linha
    if(input.value == ''){
        alert('Ops! Acho que você está tentando adicionar uma tarefa vazia.')
    }
    else{
        let texto = input.value;//Recupera o texto digitado
        lista.push(texto)//Adiciona o texto no array;
        mostrarLista();
        input.value='';
        input.focus();
    }
   
}
function excluir(pos){//Exclui uma linha
    if(confirm('Tem certeza que quer excluir essa tarefa?')){
        let item = lista[pos];
        itensExcluidos.push(item);
        lista.splice(pos,1);
        mostrarLista();
        input.focus();
    }else{
        mostrarLista();
    }
}
function restaurar(pos){
    if(confirm('Deseja restaurar esse item ? ')){
        lista.push(itensExcluidos[pos])
        mostrarLista();
        itensExcluidos.splice(pos,1);
        mostrarLixeira(excluidos)
        console.log(lista)
        console.log(itensExcluidos)
    }
    
}
function mostrarLista(){//Mostra oque foi digitado
    ul.innerHTML = '';//Para que não repita os valores do array.

    for(item of lista){//Pega todos os textos do array
        const li = document.createElement('li');//Cria uma linha
        const pos = lista.indexOf(item);//Guarda a posição da linha em relação ao array;
        const textoLi = document.createTextNode(item);//Cria o texto na linha
        const i = document.createElement('i');//Cria o icone;

        i.className = 'bi bi-x-square-fill excluir';//Adiciona a classe de estilização do icone;
        i.setAttribute('onclick',`excluir(${pos})`);//Atribui o onclick para quando precisar excluir;

        li.appendChild(textoLi);//Adiciona o texto na linha;
        li.appendChild(i)//Adiciona o icone na linha;
        ul.appendChild(li);//Adiciona  linha na lista;
    
    }
}
function mostrarLixeira(lista){
    lista.innerHTML = ''
    for(item of itensExcluidos){//Pega todos os textos do array
        const li = document.createElement('li');
        const textoLi = document.createTextNode(item);
        const i = document.createElement('i');
        let pos = itensExcluidos.indexOf(item);
        i.className = 'bi bi-check-square-fill';
        i.setAttribute('onclick',`restaurar(${pos})`);//Atribui o onclick para quando precisar excluir;
        li.appendChild(textoLi);
        li.appendChild(i);
        lista.appendChild(li);
    }

}
mostrarLista();
function abrirLixeira(){
    let conteudo = document.getElementById('conteudo');
    let lixeira = document.getElementById('lixeira');

    lixeira.style.display = 'block'
    conteudo.style.display = 'none';

    document.getElementById('voltar').addEventListener('click', e=>{
        lixeira.style.display = 'none';
        conteudo.style.display = 'block';
    } )
    document.getElementById('excluirTodos').addEventListener('click',e=>{
        if(itensExcluidos.length == 0){
            alert("Como eu vou excluir tudo se não tem nada ? O-O ")
        }
        else if(confirm('Deseja excluir TODOS os itens permanentemente ?')){
            itensExcluidos = [];
            mostrarLixeira(excluidos)
        }
    })
    mostrarLixeira(excluidos)
}

