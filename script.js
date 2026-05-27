const verSenha = document.getElementById("ver-senha")
const nome = document.getElementById("nome")
const reqTamanho = document.getElementById("req-tamanho")
const reqMaiuscula = document.getElementById("req-maiuscula")
const reqMinuscula = document.getElementById("req-minuscula")
const reqEspecial = document.getElementById("req-especial")
const email = document.getElementById("email")
const senha = document.getElementById("senha")
const mensagemEmail = document.getElementById("mensagem-email")
const mensagemSenha = document.getElementById("mensagem-senha")
const mensagemNome = document.getElementById("mensagem-nome")
const formulario = document.getElementById("formulario")
const cep = document.getElementById("cep")
const rua = document.getElementById("rua")
const bairro = document.getElementById("bairro")
const cidade = document.getElementById("cidade")
const estado = document.getElementById("estado")
const mensagem = document.getElementById("mensagem-cep")
const icone = verSenha.querySelector("i")
const confirmarSenha = document.getElementById("confirmar-senha")
const mensagemConfirmarSenha = document.getElementById("mensagem-confirmar-senha")

senha.addEventListener("input", () => {
    if(senha.value.length >= 6){
        reqTamanho.classList.add("valido")
    } else {
        reqTamanho.classList.remove("valido")
    }
    if(/[A-Z]/.test(senha.value)){
        reqMaiuscula.classList.add("valido")
    } else {  
        reqMaiuscula.classList.remove("valido")}
    if(/[a-z]/.test(senha.value)){
        reqMinuscula.classList.add("valido")
    } else {
        reqMinuscula.classList.remove("valido")
    }
    if(/[!@#$%&.*]/.test(senha.value)){
        reqEspecial.classList.add("valido")
    } else {
        reqEspecial.classList.remove("valido")
    }
})
verSenha.addEventListener("click", () => {
    if(senha.type === "password"){
    senha.type = "text"
    icone.classList.replace("fa-eye", "fa-eye-slash")
} else {
    senha.type = "password"
    icone.classList.replace("fa-eye-slash", "fa-eye")
}
})
cep.addEventListener("blur", () => {
    console.log("Buscando cep...")
    if(cep.value.length !== 8) {
    mensagem.textContent = "CEP inválido"
    return
}
    fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
        .then(response => response.json())
        .then(dados => {
            if(dados.erro){
                mensagem.textContent = "CEP inválido"}
            else{
                mensagem.textContent = ""
            rua.value = dados.logradouro
            bairro.value = dados.bairro
            cidade.value = dados.localidade
            estado.value = dados.uf
            console.log(dados)}
        })
})                    
formulario.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log("formulario enviado")
    if(nome.value === ""){
        mensagemNome.textContent = "Insira o seu Nome"
    }
    else {
        mensagemNome.textContent = ""
    }
    if(confirmarSenha.value !== senha.value){
    mensagemConfirmarSenha.textContent = "As senhas não coincidem"
} else {
    mensagemConfirmarSenha.textContent = ""
}
    if(email.value === ""){
        mensagemEmail.textContent = "Insira o seu Email"
    }
    else{
        mensagemEmail.textContent = ""
    }

    if(senha.value === ""){
        mensagemSenha.textContent = "Insira a sua Senha"
    }
    else if(senha.value.length < 6){
    mensagemSenha.textContent = "Senha precisa ter pelo menos 6 caracteres"
    }
    else if(!/[A-Z]/.test(senha.value)){
    mensagemSenha.textContent = "Senha precisa ter pelo menos uma letra maiúscula"
    }
    else if(!/[a-z]/.test(senha.value)){
    mensagemSenha.textContent = "Senha precisa ter pelo menos uma letra minúscula"
    }
    else if(!/[!@#$%&.*]/.test(senha.value)){
    mensagemSenha.textContent = "Senha precisa ter pelo menos um caractere especial"
    }
    else{
        mensagemSenha.textContent = ""
    }
})