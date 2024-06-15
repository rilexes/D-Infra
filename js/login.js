// Importando SDKs do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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

// Referência ao formulário de login
const loginForm = document.getElementById('loginForm');

// Evento de submissão do formulário de login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');

    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = 'inventario.html'; // Redireciona para a página de inventário
    } catch (error) {
        loginError.textContent = "Erro ao fazer login: " + error.message;
    }
});

// Verifica se o usuário está logado
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = 'inventario.html'; // Redireciona para a página de inventário se estiver logado
    }
});
