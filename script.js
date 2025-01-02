// Elementos da página
const searchBar = document.getElementById('search-bar');
const gallery = document.getElementById('gallery');
const noResults = document.getElementById('no-results');
const filterButtons = document.querySelectorAll('.filter-btn');
const showAllButton = document.getElementById('show-all');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

// Toggle menu retrátil
const menuToggle = document.getElementById('menuToggle'); // Botão de hamburguer
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');

// Adiciona o comportamento de menu retrátil (Hamburguer Menu)
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-hidden');  // Exibe/oculta a sidebar
    content.classList.toggle('sidebar-visible'); // Ajusta o conteúdo quando a sidebar está visível
});



// Mapa de tradução
const translationMap = {
    espedita: "bedum",
    expedita: "bedum",
    bebe: "bedum",
    bébé: "bedum",
    encrenca: "bedum",
    avó: "voinha",
    vó: "voinha",
    dona: "voinha",
    maria: "voinha",
    avô: "voinho",
    vô: "voinho",
    valdemar: "voinho",
    vava: "voinho",
    valdemiro: "voinho",
    micula: "milton",
    clemilton: "milton",
    zenaide: "lala",
    zene: "lala",
    lálá: "lala",
    clademar: "cal",
    zélia: "zelia",
    biliu: "zelia",
    claudemir: "mimi",
    jose: "api",
    josé: "api",
    roberto: "api",
    zezinho: "api",
    socorrinho: "corro",
    socorro: "corro",
    corrinho: "corro",
    coca: "corro",
    su: "susana",
    eulina: "lina",
    lilita: "lina",
    layla: "lina",
    dunga: "lina",
    fatima: "fal",
    lucia: "fal",
    fátima: "fal",
    lúcia: "fal",
    manoel: "neco",
    nequinho: "neco",
    mané: "neco",
    aninha: "anitta",
    ana: "anitta",
    fábio: "fabio",
    fabinho: "fabio",
    celinho: "marcelo",
    donda: "carla",
    tatiane: "carla",
    claudia: "kid",
    negona: "kid",
    kidoria: "kid",
    kidória: "kid",
    lu: "luciano",
    nininho: "paulo",
    beiguera: "wagner",
    baiga: "wagner",
    bier: "wagner",
    beier: "wagner",
    gustavo: "guga",
    celina: "marcela",
    cácá: "caca",
    cacá: "caca",
    kaka: "caca",
    káká: "caca",
    kaká: "caca",
    cazinha: "caca",
    catarina: "caca",
    ca: "caca",
    rá: "raine",
    inhe: "raine",
    raianne: "raine",
    raynne: "raine",
    raiane: "raine",
    rayne: "raine",
    carlinha: "raine",
    nen: "raine",
    preta: "fernandinha",
    pirralha: "finha",
    rafinha: "finha",
    rafaela: "finha",
    pi: "finha",
    thiago: "tiago",
    tiaguinho: "tiago",
    ferdanda: "fernandinha",
    zinha: "fernandinha",
    nandinha: "fernandinha",
    matheus: "teteu",
    mateu: "teteu",
    teu: "teteu",
    joão: "teteu",
    celinho: "sá",
    dudinha: "duda",
    eduarda: "duda",
    dudis: "duda",
    du: "duda",
    Beatriz: "bia",
    bi: "bia",
    bibi: "bia",
    biazinha: "bia",
    biloca: "bia",
    biloka: "bia",
    rafael: "rafa",
    rafaie: "rafa",
    manuela: "manu",
    manuella: "manu",
    nu: "manu",
    manuca: "manu",
    rodriguinho: "rodrigo",
    drigo: "rodrigo",
    leticia: "lele",
    letícia: "lele",
    le: "lele",
    lê: "lele",
    lêlê: "lele",
    juju: "julia",
    julinha: "julia",
    alicinha: "alice",
    davizinho: "davi",
    tomtom: "tom",
};

// Array para armazenar tags ativas
let activeTags = [];

// Função para traduzir palavras usando o translationMap
function translateWord(word) {
    return translationMap[word] || word; // Traduz ou mantém a palavra original
}

// Função para filtrar imagens com base na pesquisa
searchBar.addEventListener('input', function () {
    const searchQuery = searchBar.value.toLowerCase();
    const translatedQuery = translateWord(searchQuery); // Traduz a palavra da pesquisa
    const items = gallery.getElementsByClassName('gallery-item');
    let found = false;

    // Loop através dos itens da galeria
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const tags = item.getAttribute('data-tags').toLowerCase();

        // Verificar se a pesquisa traduzida está presente nas tags
        if (tags.includes(translatedQuery)) {
            item.style.display = 'block'; // Exibir imagem
            found = true;
        } else {
            item.style.display = 'none'; // Ocultar imagem
        }
    }

    noResults.style.display = found ? 'none' : 'block';
});

// Função para filtrar imagens por tag
filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        const tag = this.getAttribute('data-tag');
        const translatedTag = translateWord(tag); // Traduz a tag

        if (activeTags.includes(translatedTag)) {
            activeTags = activeTags.filter(activeTag => activeTag !== translatedTag); // Desmarcar
            this.classList.remove('active');
        } else {
            activeTags.push(translatedTag); // Marcar
            this.classList.add('active');
        }

        filterByTags(activeTags);
    });
});

// Função para filtrar imagens com base nas tags ativas
function filterByTags(tags) {
    const items = gallery.getElementsByClassName('gallery-item');
    let found = false;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemTags = item.getAttribute('data-tags').toLowerCase().split(',');

        const allTagsMatch = tags.every(tag => itemTags.includes(tag));

        if (allTagsMatch) {
            item.style.display = 'block'; // Exibir imagem
            found = true;
        } else {
            item.style.display = 'none'; // Ocultar imagem
        }
    }

    noResults.style.display = found ? 'none' : 'block';
}

// Função para exibir todas as imagens
showAllButton.addEventListener('click', function () {
    activeTags = [];
    filterButtons.forEach(button => button.classList.remove('active')); // Remover seleção de todos os botões
    const items = gallery.getElementsByClassName('gallery-item');
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = 'block'; // Exibir todas as imagens
    }
    noResults.style.display = 'none';
});

// Abrir o modal quando a imagem for clicada
const galleryItems = document.querySelectorAll('.gallery-item img');
galleryItems.forEach(item => {
    item.addEventListener('click', function () {
        modal.style.display = 'flex';
        modalImage.src = this.src;  // Definir a imagem no modal
    });
});

// Fechar o modal quando o botão de fechar for clicado
closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
});

// Fechar o modal quando clicar fora da imagem
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
