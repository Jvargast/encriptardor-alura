const textArea = document.querySelector(".container__left__txt");
const imgMuneco = document.querySelector(".container__right__muneco");
const titleRight = document.querySelector(".container__right__msj__title");
const pRight = document.querySelector(".container__right__msj__p");
const container = document.querySelector(".container__right__msj");
const btnEncrypt = document.getElementById("btnEncrypt");
const btnDecrypt = document.getElementById("btnDecrypt");
const btnCopy = document.getElementById("btnCopy");

function encriptar(texto) {
    const reglas = [
        { letra: 'e', reemplazo: 'enter' },
        { letra: 'i', reemplazo: 'imes' },
        { letra: 'a', reemplazo: 'ai' },
        { letra: 'o', reemplazo: 'ober' },
        { letra: 'u', reemplazo: 'ufat' }
    ];

    let textoEncriptado = texto.toLowerCase();

    reglas.forEach(regla => {
        const regex = new RegExp(regla.letra, 'g');
        textoEncriptado = textoEncriptado.replace(regex, regla.reemplazo);
    });

    return textoEncriptado;
};

function desencriptar(textoEncriptado) {
    const reglas = [
        { letra: 'e', reemplazo: 'enter' },
        { letra: 'i', reemplazo: 'imes' },
        { letra: 'a', reemplazo: 'ai' },
        { letra: 'o', reemplazo: 'ober' },
        { letra: 'u', reemplazo: 'ufat' }
    ];

    let textoDesencriptado = textoEncriptado.toLowerCase();

    // Desencriptar en el orden inverso al de encriptación
    reglas.reverse().forEach(regla => {
        const regex = new RegExp(regla.reemplazo, 'g');
        textoDesencriptado = textoDesencriptado.replace(regex, regla.letra);
    });

    return textoDesencriptado;
};

textArea.addEventListener("input", (e)=> {
    if(textArea.value.length > 0 ) {
        imgMuneco.style.display = "none";
        titleRight.textContent = "Esperando Mensaje...";
        pRight.textContent = "";
        btnCopy.style.display = "none";
        container.style.marginTop = "0px";
        container.style.height = "";
        pRight.style.fontSize = "1.6rem";
    } else {
        imgMuneco.style.display = "block";
        titleRight.textContent = "Ningún mensaje fue encontrado";
        pRight.textContent = "Ingresa el texto que desees encriptar o desencriptar.";
    }
    
});

btnEncrypt.addEventListener("click", (e)=> {
    e.preventDefault();
    titleRight.textContent = "";
    const txt = textArea.value;
    const txtEncrypt = encriptar(txt);
    btnCopy.style.display = "block";
    pRight.textContent = txtEncrypt;
    pRight.style.fontSize = "2.4rem";
    pRight.style.height = "73%";
    container.style.height = "100%";
});

btnDecrypt.addEventListener("click", (e)=> {
    e.preventDefault();
    const txt = textArea.value;
    const textDecrypt = desencriptar(txt);
    pRight.textContent = textDecrypt;
    titleRight.textContent = "";
    pRight.style.fontSize = "2.4rem";
    pRight.style.height = "73%";
    container.style.height = "100%";
    container.style.width = "80%";
    btnCopy.style.display = "none";
});

btnCopy.addEventListener("click", (e)=> {
    e.preventDefault();
    const txtCopy = pRight.textContent;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(txtCopy).then(() => {
            imgMuneco.style.display = "block";
            alert('Texto copiado al portapapeles');
            imgMuneco.style.display = "none";
        }).catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
    } else {
        // Fallback para navegadores antiguos
        resultadoTexto.select();
        document.execCommand('copy');
        alert('Texto copiado al portapapeles 2');
    }
});