// Importando SDKs do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, addDoc, collection, updateDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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
const db = getFirestore(app);

// Referência para o formulário de item
const itemForm = document.getElementById('itemForm');

// Evento de submissão do formulário
itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const macAddress = document.getElementById('macAddress').value;
    const fabricante = document.getElementById('fabricante').value;
    const modelo = document.getElementById('modelo').value;
    const descricao = document.getElementById('descricao').value;
    const dataAquisicao = document.getElementById('dataAquisicao').value;
    const preco = document.getElementById('preco').value;
    const localizacao = document.getElementById('localizacao').value;
    const tipo = document.getElementById('tipo').value;
    const especificacoes = document.getElementById('especificacoes').value;

    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');

    try {
        if (editId) {
            // Atualiza item no Firestore
            await updateDoc(doc(db, "items", editId), {
                macAddress,
                fabricante,
                modelo,
                descricao,
                dataAquisicao,
                preco,
                localizacao,
                tipo,
                especificacoes
            });

            alert("Item atualizado com sucesso!");
        } else {
            // Adiciona item ao Firestore
            await addDoc(collection(db, "items"), {
                macAddress,
                fabricante,
                modelo,
                descricao,
                dataAquisicao,
                preco,
                localizacao,
                tipo,
                especificacoes
            });

            alert("Item adicionado com sucesso!");
        }

        itemForm.reset();
    } catch (error) {
        console.error("Erro ao salvar item: ", error);
    }
});

// Carregar dados de item a ser editado se a página foi acessada com parâmetro 'edit'
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');

    if (editId) {
        try {
            const docRef = doc(db, "items", editId);
            const docSnapshot = await getDoc(docRef);
            const item = docSnapshot.data();

            document.getElementById('macAddress').value = item.macAddress;
            document.getElementById('fabricante').value = item.fabricante;
            document.getElementById('modelo').value = item.modelo;
            document.getElementById('descricao').value = item.descricao;
            document.getElementById('dataAquisicao').value = item.dataAquisicao;
            document.getElementById('preco').value = item.preco;
            document.getElementById('localizacao').value = item.localizacao;
            document.getElementById('tipo').value = item.tipo;
            document.getElementById('especificacoes').value = item.especificacoes;
        } catch (error) {
            console.error("Erro ao carregar dados do item: ", error);
        }
    }
});
