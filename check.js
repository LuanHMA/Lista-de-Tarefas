const ul = document.querySelector('ul');//Lista HTML
const excluidos = document.getElementById('lista-excluidos');//Lista Lixeira
const input = document.querySelector('#tarefa');//Campo do texto
let lista = [];//Guarda o texto digitado
let itensExcluidos = [localStorage.getItem('lixeira')];

//Bug ao excluir, restaurar e excluir de novo

if(localStorage.getItem('id') == null){
    localStorage.setItem('id',0);
}
if(localStorage.getItem('lixeira') == null){
    localStorage.setItem('lixeira','');
}
//Configurações de agilidade
input.focus();
document.addEventListener('keypress',e=>{
    if(e.key == 'Enter'){
        document.querySelector('button#adicionar').click();
    }
})

function idAdd(){
    let id = localStorage.getItem('id');
    return parseInt(id) + 1;
}
function adicionar(){//Adiciona na linha
    if(input.value == ''){
        alert('Ops! Acho que você está tentando adicionar uma tarefa vazia.')
    }
    else{
        let texto = input.value;//Recupera o texto digitado
        const idLS = idAdd();
        localStorage.setItem(idLS,texto);
        localStorage.setItem('id',idLS)

        input.value='';
        input.focus();
        mostrarLista();
    }
}
function mostrarLista(){//Mostra oque foi digitado
    let itemLS = localStorage.getItem('id');
    ul.innerHTML = ''
    for(let i = 1; i<= itemLS; i++){
        let item = localStorage.getItem(i);

        if(item == null) continue;

        const li = document.createElement('li');//Cria uma linha
        // const pos = lista.indexOf(item);//Guarda a posição da linha em relação ao array;
        const textoLi = document.createTextNode(item);//Cria o texto na linha
        const input = document.createElement('input');//Cria o icone;
        input.type = 'checkbox'
        input.setAttribute('onclick',`excluir(${i})`);//Atribui o onclick para quando precisar excluir;

        li.appendChild(textoLi);//Adiciona o texto na linha;
        li.appendChild(input)//Adiciona o icone na linha;
        ul.appendChild(li);//Adiciona  linha na lista;
    }
}
mostrarLista();
function excluir(pos){//Exclui uma linha
    setTimeout(() => {
        itensExcluidos.push(localStorage.getItem(pos));//O problema é aqui.Pois ele faz esse push e muda a lixeira, porem o Array de itensExcluidos está sempre recuperando a lixeira.
        localStorage.setItem('lixeira',itensExcluidos);
        localStorage.removeItem(pos);
        mostrarLista();
        input.focus();
        console.log(itensExcluidos)
    }, 700);

        
}
function mostrarLixeira(lista){
    
    document.getElementById('excluirTodos').addEventListener('click', e=>{
        localStorage.removeItem('lixeira')
        itensExcluidos = [localStorage.setItem('lixeira', '')];
        lista.innerHTML = ''
    })
    
    lista.innerHTML = ''
    let dadosLS = localStorage.getItem('lixeira')
    let dados = dadosLS.split(',');
    
    dados.forEach(dado=>{
        if(dado == ''){
            lista.innerHTML= ''
        }else{
            const li = document.createElement('li');
            const textoLi = document.createTextNode(dado);
            const i = document.createElement('i');
            let pos = dados.indexOf(dado);//Posição do array
            i.className = 'bi bi-check-square-fill';
            i.setAttribute('onclick',`restaurar(${pos})`);//Atribui o onclick para quando precisar excluir;
            li.appendChild(textoLi);
            li.appendChild(i);
            lista.appendChild(li);
        }
        
    })

}
function restaurar(pos){
    if(confirm('Deseja restaurar esse item ? ')){
        let id = idAdd();
        let dadosLS = localStorage.getItem('lixeira');
        let dados = dadosLS.split(',');
        let newLixeira = [];
        dados.forEach(item=>{
            if(item != dados[pos]){
                newLixeira.push(item)
            }
            if(item == dados[pos]){
                //Adicionar a lista principal
                localStorage.setItem(id,dados[pos]);
                localStorage.setItem('id',id);
                mostrarLista();
            }
        })
        localStorage.setItem('lixeira',newLixeira);
        itensExcluidos = [localStorage.getItem('lixeira')];

        mostrarLixeira(excluidos);
    }
    
}
function abrirLixeira(){
    let conteudo = document.getElementById('conteudo');
    let lixeira = document.getElementById('lixeira');

    lixeira.style.display = 'block'
    conteudo.style.display = 'none';

    document.getElementById('voltar').addEventListener('click', e=>{
        lixeira.style.display = 'none';
        conteudo.style.display = 'block';
    } )
    mostrarLixeira(excluidos)
}

