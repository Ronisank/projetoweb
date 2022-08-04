const iFormulario = document.getElementById('formulario');
const ulListForm = document.getElementById('lista-formulario');

//Elementos do formulário
const inpTitulo = document.getElementById('input-titulo');
const inpSkill = document.getElementById('input-skill');
const inpCategoria = document.getElementById('input-categoria');
const inpTxtArea = document.getElementById('texto-descricao');
const inpVideo = document.getElementById('input-video');

// Vetor de controle
const lista = [];


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
    return li;

}

function atualizarTela() {
    ulListForm.innerHTML ='';
    lista.forEach((item) => {
        const elemento = criarElementos(item)
        ulListForm.appendChild(elemento)
    })
}

iFormulario.addEventListener('submit', (event) => {
    event.preventDefault();

    const novoItem = {
        titulo: inpTitulo.value,
        skill: inpSkill.value,
        categoria: inpCategoria.value,
        descricao: inpTxtArea.value
    }
    const novoItem1 = {
        titulo: inpTitulo.value,
        skill: inpSkill.value,
        categoria: inpCategoria.value,
        descricao: inpTxtArea.value
    }

    lista.push(novoItem);

    atualizarTela()
})
atualizarTela()