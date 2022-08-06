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
let lista = [{
    titulo: 'Flex box',
    skill: 'CSS',
    categoria: 'FrontEnd',
    descricao: 'A diferença crucial entre flex-box e grid , além do primeiro ser unidimensional e o outro ser bi-dimensional.',
    link: 'https://youtu.be/VGD5Uy1C8Cw',
},
{
    titulo: 'Desenvolvimento',
    skill: 'JavaScript',
    categoria: 'FrontEnd',
    descricao: 'A linguagem JavaScript é projetada com base em um simples paradigma orientado a objeto. Um objeto é uma coleção de propriedades, e uma propriedade é uma associação entre um nome (ou chave) e um valor.',
},
{
    titulo: 'Desenvolvimento Python',
    skill: 'Python',
    categoria: 'BackEnd',
    descricao: 'A linguagem JavaScript é projetada com base em um simples paradigma orientado a objeto. Um objeto é uma coleção de propriedades, e uma propriedade é uma associação entre um nome (ou chave) e um valor.',

},
];

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

function gerarItens() {
    const novoItem = {
        titulo: inpTitulo.value,
        skill: inpSkill.value,
        categoria: inpCategoria.value,
        descricao: inpTxtArea.value,
        link: inpVideo.value,
    }
    
    lista.push(novoItem);

    atualizarTela(lista)
    salvarLista()
}
function atualizarCategoria() {
    const total = lista.reduce((acc, item) => {
        if (item.categoria === 'Total') {
            return acc + 1
        }
    }, 0)
    const frontEnd = lista.reduce((acc, item) => {
        if (item.categoria === 'FrontEnd') {
            return acc + 1
        }
    }, 0)
    const backEnd = lista.reduce((acc, item) => {
            if (item.categoria === 'BacktEnd') {
                return acc + 1
            }
    }, 0)
    const fullStack = lista.reduce((acc, item) => {
        if (item.categoria === 'FullStack') {
            return acc + 1
            }
    }, 0)
    const softSkill = lista.reduce((acc, item) => {
            if (item.categoria === 'Comportamental/Soft') {
                return acc + 1
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
    botaoExcluir.innerHTML = 'X'
    li.appendChild(botaoExcluir);

    const botaoEditar = document.createElement('button')
    botaoEditar.innerHTML = 'Editar'
    li.appendChild(botaoEditar);

    // Botão de link do video com string templates
    const botaoLink = document.createElement('a')
    botaoLink.innerHTML = `${item.link ? `<a href="${item.link}"><button>Link</button></a>` : ''}`
    li.appendChild(botaoLink);
        
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
    

    // Botão de pesquisa
btnPesquisa.addEventListener('click', () => {
    const filtroLista = lista.filter((item) => 
        item.titulo.toLocaleLowerCase().includes(inpPesquisa.value.toLocaleLowerCase())

    )
    atualizarTela(filtroLista)
    
})
    // Botão para limpar a pesquisa.
btnLimpar.addEventListener('click', () => {
    inpPesquisa.value = '';
    atualizarTela(lista)
})


})  

recuperarLista()