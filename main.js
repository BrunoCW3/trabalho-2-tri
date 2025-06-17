const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const valorEntropia = document.querySelector('.entropia');

// Botões novos
const botaoGerar = document.querySelector('#btn-gerar');
const botaoCopiar = document.querySelector('#btn-copiar');

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;
botaoGerar.onclick = geraSenha;
botaoCopiar.onclick = copiarSenha;

checkbox.forEach((cb) => cb.onclick = geraSenha);

geraSenha();

function diminuiTamanho() {
    if (tamanhoSenha > 1) tamanhoSenha--;
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) tamanhoSenha++;
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function geraSenha() {
    let alfabeto = '';
    if (document.querySelector('#maiusculo').checked) alfabeto += letrasMaiusculas;
    if (document.querySelector('#minusculo').checked) alfabeto += letrasMinusculas;
    if (document.querySelector('#numero').checked) alfabeto += numeros;
    if (document.querySelector('#simbolo').checked) alfabeto += simbolos;

    if (alfabeto.length === 0) {
        campoSenha.value = '⚠️ Marque ao menos uma opção!';
        return;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        const numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[numeroAleatorio];
    }

    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

function copiarSenha() {
    if (campoSenha.value && campoSenha.value !== '⚠️ Marque ao menos uma opção!') {
        navigator.clipboard.writeText(campoSenha.value);
        botaoCopiar.textContent = "Copiado!";
        setTimeout(() => botaoCopiar.textContent = "Copiar senha", 1500);
    }
}

function classificaSenha(tamanhoAlfabeto) {
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    forcaSenha.classList.remove('fraca', 'media', 'forte');

    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }

    let dias = Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24));
    valorEntropia.textContent = `Um computador pode levar até ${dias} dias para descobrir essa senha.`;
}
