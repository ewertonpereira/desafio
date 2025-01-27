secretFriendsList = [];

function checkEmptyList(list){
    return Array.isArray(list) && list.length === 0;
}

function checkInput(inputUser){
    // Expressão regular que procura por qualquer dígito e caracter especial, mas permite espaços
    const regex = /[^a-zA-Z\s]/g; 
    return inputUser.trim() === '' || regex.test(inputUser);
}

function addFriend(){
    let newSecretFriend = document.querySelector('input').value;
    if (secretFriendsList.includes((newSecretFriend).toUpperCase())) {
        document.getElementById('resultado').innerHTML ='Este nome já foi incluido na lista.';
        document.querySelector('input').value = '';
    } else {
        checkInput(newSecretFriend) ? alert('Por favor, insira um nome válido.') : secretFriendsList.push((newSecretFriend).toUpperCase());
        document.querySelector('input').value = '';
        document.getElementById('resultado').innerHTML = '';
    }
}

document.getElementById('adicionarAmigo').addEventListener('click', ()=> {
    const list = document.getElementById('listaAmigos');
    list.innerHTML = '';

    for (let index = 0; index < secretFriendsList.length; index++) {
        const newItem = document.createElement('li');
        newItem.textContent = secretFriendsList[index];
        list.appendChild(newItem);
    }
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // Gera um índice aleatório entre 0 e i
      const j = Math.floor(Math.random() * (i + 1));
  
      // Troca os elementos array[i] e array[j]
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

function randomlySelectedFriend(list){
    shuffle(list);
    return list.pop();
}

document.getElementById('drawFriend').addEventListener('click', () => {
    if (checkEmptyList(secretFriendsList)) {
        document.getElementById('resultado').innerHTML = 'A lista está vazia.';
    } else {
        let removedItem = randomlySelectedFriend(secretFriendsList);
        document.getElementById('resultado').innerHTML = removedItem;

        // Encontrar o índice do amigo selecionado e remover do array
        const index = secretFriendsList.indexOf(removedItem);
        if (index !== -1) {
            secretFriendsList.splice(index, 1);
        }

        // Limpar a lista no HTML
        const list = document.getElementById('listaAmigos');
        list.innerHTML = '';

        // Adicionar os itens atualizados da lista no HTML
        secretFriendsList.forEach(item => {
            const newItem = document.createElement('li');
            newItem.textContent = item;
            list.appendChild(newItem);
        });
    }
});
