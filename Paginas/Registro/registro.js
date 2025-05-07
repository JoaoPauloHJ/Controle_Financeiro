firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "../Home/homeFinan.html"
    }
})


function onChangeEmail() {
    const email = form.email().value;
    form.ErroEmailObrigatorio().style.display = email ? "none" : "block";

    form.ErroEmailInvalido().style.display = validateEmail(email) ? "none" : "block";
    alternarBotaoRegistroDesabilitado();
}

function onChangePassword() {
    const senha = form.senha().value;
    form.ErroSenhaNecessario().style.display = senha ? "none" : "block";

    form.ErroMinSenha().style.display = senha.length >= 6 ? "none" : "block";

    validarSenhasIguais();
    alternarBotaoRegistroDesabilitado();
}

function onChangeConfirmPassword() {
    validarSenhasIguais();
    alternarBotaoRegistroDesabilitado();

}

function register() {
    showLoading();

    const email = form.email().value;
    const senha = form.senha().value;
    firebase.auth().createUserWithEmailAndPassword(
        email, senha
    ).then(() => {
        hideLoading();
        window.location.href = "../../index.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "Email já está em uso";
    }
    return error.message;
}

function validarSenhasIguais() {
    const senha = form.senha().value;
    const confirmarSenha = form.confirmarSenha().value;

    form.ErroSenhaNaoCorresponde().style.display = 
        senha == confirmarSenha ? "none" : "block";
}

function alternarBotaoRegistroDesabilitado() {
    form.botaoRegistrar().disabled = !oFormularioValido();
}

function oFormularioValido() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const senha = form.senha().value;
    if (!senha || senha.length < 6) {
        return false;
    }

    const confirmarSenha = form.confirmarSenha().value;
    if (senha != confirmarSenha) {
        return false;
    }

    return true;
}

const form = {
    confirmarSenha: () =>  document.getElementById('ConfirmarSenha'),
    ErroSenhaNaoCorresponde: () => document.getElementById('erro-senha-nao-corresponde'),
    email: () => document.getElementById('email'),
    ErroEmailInvalido: () => document.getElementById('Erro-Email-Invalido'),
    ErroEmailObrigatorio: () => document.getElementById('Erro-Email-Obrigatorio'),
    senha: () => document.getElementById('senha'),
    ErroSenhaNecessario: () => document.getElementById('erro-senha-necessario'),
    ErroMinSenha: () => document.getElementById('erro-min-senha'),
    botaoRegistrar: () => document.getElementById('botao-registrar')
}