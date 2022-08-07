const iFormulario = document.getElementById('formulario');
const ulListForm = document.getElementById('lista-formulario');

//Elementos do formulário
const inpTitulo = document.getElementById('input-titulo');
const inpSkill = document.getElementById('input-skill');
const inpCategoria = document.getElementById('input-categoria');
const inpTxtArea = document.getElementById('texto-descricao');
const inpVideo = document.getElementById('input-video');

//Elementos da pesquisa
const inpPesquisa = document.getElementById('input-busca');
const btnPesquisa = document.getElementById('btn-pesquisa');
const btnLimpar = document.getElementById('btn-apaga');

//Elementos do card
const pTotal = document.getElementById('total');
const pFront = document.getElementById('front');
const pBack = document.getElementById('back');
const pFull = document.getElementById('full');
const pSoft = document.getElementById('soft');

// Vetor de controle
let lista = [{}];

let editando = null;

// Função para remover item
function removerItem(remover) {
    lista = lista.filter(item => item !== remover)
    atualizarTela(lista)
}

// Salvar no localstorage
function salvarLista() {
    const listaJson = JSON.stringify(lista)
    localStorage.setItem('listas', listaJson)
}

// Função para recuperar do localStorage
function recuperarLista() {
    const listaJson = localStorage.getItem('listas')
    if (listaJson) {
        lista = JSON.parse(listaJson)
    }
    atualizarTela(lista)
}
    // Função para gerar novos itens
function gerarItens() {
    const novoItem = {
        titulo: inpTitulo.value,
        skill: inpSkill.value,
        categoria: inpCategoria.value,
        descricao: inpTxtArea.value,
        link: inpVideo.value,
    }
    if (!editando) {
        lista.push(novoItem);
        alert('SUCESSO! \n\nDica cadastrada na base de conhecimento.')
    }
    else {
        editando.titulo = novoItem.titulo
        editando = null;
        alert('SUCESSO!\n\nDica alterada na base de conhecimento.')
    }
    
    iFormulario.reset()
    atualizarTela(lista)
    salvarLista()
}

function editarItem(EdicaoDeItem) {
    const {titulo, skill, categoria, descricao, link } = EdicaoDeItem; 
    
    inpTitulo.value = titulo
    inpSkill.value = skill
    inpCategoria.value = categoria
    inpTxtArea.value = descricao
    inpVideo.value = link



    editando = EdicaoDeItem;
}


    // Função para atualizar os cards de categorias
function atualizarCategoria() {
    const total = lista.reduce((acc, item) => { 
        if ( item.categoria !== 0) {
        return acc + 1
        }
        else {
            return acc
        }
    }, 0)

    const frontEnd = lista.reduce((acc, item) => {
        if (item.categoria === 'FrontEnd') {
            return acc + 1
        }
        else {
            return acc
        }
    }, 0)

    const backEnd = lista.reduce((acc, item) => {
            if (item.categoria === 'BackEnd') {
                return acc + 1
        } 
        else {
            return acc
        }
    }, 0)
    
    const fullStack = lista.reduce((acc, item) => {
        if (item.categoria === 'FullStack') {
            return acc + 1
        }
        else {
            return acc
        }
    },0)
    
    const softSkill = lista.reduce((acc, item) => {
        if (item.categoria === 'Soft-Skill') {
            return acc + 1
        }
        else {
            return acc
        }
    }, 0)

    pTotal.innerText = total;  
    pFront.innerText = frontEnd;  
    pBack.innerText = backEnd;  
    pFull.innerText = fullStack;  
    pSoft.innerText = softSkill;  
}

// Criação do elemento HTML
function criarElementos(item) {
    const li = document.createElement('li');

    const titulo = document.createElement('h3');
    titulo.innerHTML = item.titulo;
    li.appendChild(titulo)

    const skill = document.createElement('h4');
    skill.innerHTML = item.skill;
    li.appendChild(skill);

    const categoria = document.createElement('p');
    categoria.innerHTML = item.categoria;
    li.appendChild(categoria);

    const descricao = document.createElement('p');
    descricao.innerHTML = item.descricao;
    li.appendChild(descricao);

    const botaoExcluir = document.createElement('button')
    botaoExcluir.innerHTML = '🗑️'
    li.appendChild(botaoExcluir);

    const botaoEditar = document.createElement('button')
    botaoEditar.innerHTML = '✒️'
    li.appendChild(botaoEditar);
    
    // Botão de link do video com string templates
    const botaoLink = document.createElement('a')
    botaoLink.innerHTML = `${item.link ? `<a href="${item.link}"><button>▶️</button></a>` : ''}`
    li.appendChild(botaoLink);

    // Criando botão de evento
    botaoExcluir.addEventListener('click', () => {
        confirm('DELETANDO!\n\nVocê tem certeza de que deseja deletar esta dica?')
        removerItem(item)
        console.log('remove', item)
    })

    botaoEditar.addEventListener('click', () => {
        alert('EDIÇÃO\n\nAs informações da dica selecionada para edição foram enviadas para a\nbarra lateral. Realize as devidas edições e clique em Salvar para finalizar.')
        editarItem(item)
        console.log('EDITA', item)
    })
        
    return li;

}

function atualizarTela(listar) {
    ulListForm.innerHTML ='';
    listar.forEach((item) => {
        const elemento = criarElementos(item)
        ulListForm.appendChild(elemento)
    })
   atualizarCategoria()
}

iFormulario.addEventListener('submit', (event) => {
    event.preventDefault();
    gerarItens()
    
iFormulario.addEventListener('reset', (event) => {
    editando = null
})    
 

}) 
  // Botão de pesquisa
btnPesquisa.addEventListener('click', () => {
    const listaFiltrada = lista.filter((item) => 
    item.titulo.toLocaleLowerCase().includes(inpPesquisa.value.toLocaleLowerCase())
    
    )
    atualizarTela(listaFiltrada)
 
    
})
    // Botão para limpar a pesquisa.
btnLimpar.addEventListener('click', () => {
    inpPesquisa.value = '';
    atualizarTela(lista)
})

recuperarLista()