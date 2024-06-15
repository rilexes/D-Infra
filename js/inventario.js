// Importando SDKs do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAhfXZa1W4fSZ09rPxa2a604D80HxWZCrU",
    authDomain: "introfirebase-da8fb.firebaseapp.com",
    projectId: "introfirebase-da8fb",
    storageBucket: "introfirebase-da8fb.appspot.com",
    messagingSenderId: "985404522046",
    appId: "1:985404522046:web:32fdc3094293a02b0edb6f",
    measurementId: "G-32VXTR38GJ"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Referência aos elementos da interface
const logoutButton = document.getElementById('logoutButton');
const userEmailElement = document.getElementById('userEmail');

// Evento de logout
logoutButton?.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error("Erro ao fazer logout: ", error);
    });
});

// Verifica se o usuário está logado e exibe seu email
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (userEmailElement) {
            userEmailElement.textContent = `Usuário: ${user.email}`;
        }
    } else {
        window.location.href = 'login.html'; // Redireciona para a página de login se não estiver logado
    }
});

// Referência para o elemento da tabela
const itemList = document.getElementById('itemList');

// Função para carregar itens do inventário
const loadItems = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    querySnapshot.forEach((doc) => {
        const item = doc.data();
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.macAddress}</td>
            <td>${item.fabricante}</td>
            <td>${item.modelo}</td>
            <td>${item.descricao}</td>
            <td>${item.dataAquisicao}</td>
            <td>${item.preco}</td>
            <td>${item.localizacao}</td>
            <td>${item.tipo}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteItem('${doc.id}')">Excluir</button>
                <button class="btn btn-primary btn-sm" onclick="editItem('${doc.id}')">Atualizar</button>
            </td>
        `;

        itemList.appendChild(row);
    });
};

// Carrega os itens quando a página é carregada
document.addEventListener('DOMContentLoaded', loadItems);

// Função para excluir item
window.deleteItem = async (id) => {
    if (confirm("Tem certeza de que deseja excluir este item?")) {
        try {
            await deleteDoc(doc(db, "items", id));
            alert("Item excluído com sucesso!");
            // Recarrega os itens após exclusão
            itemList.innerHTML = "";
            loadItems();
        } catch (error) {
            console.error("Erro ao excluir item: ", error);
        }
    }
};

// Função para editar item
window.editItem = (id) => {
        // Abre a página de formulário em uma nova aba com o ID do item a ser editado
      window.open(`form.html?edit=${id}`, '_blank');
};
