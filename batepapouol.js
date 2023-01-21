let nome = {name: prompt("Digite seu nome:")};
let chat =[];


const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome);
promessa.then(pegarMensagensDoBatePapo);
promessa.catch(deuRuim);

function deuRuim(erro){
    const statusCode = erro.response.status;
    while(statusCode === 400){
        alert("Usuário já cadastrado no chat.");
        nome = {name: prompt("Digite seu nome:")};
    }
}
function pegarMensagensDoBatePapo(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(renderizaMensagens);
    promessa.catch()
}

function renderizaMensagens(sucesso){
    console.log('suas mensagens chegaram!!!');
    chat = sucesso.data;

exibeMensagens()
}
function exibeMensagens(){
    const batePapo = document.querySelector('.corpo-de-mensagens');
    chat.map((elemento) => {
        if(elemento.type === 'status'){
            return batePapo.innerHTML += `<li data-test="message" class="mensagem status"> <span class="tempo">(${elemento.time})<\span> <span class="usuario">${elemento.from} <\span> <span class="texto">${elemento.text}<\span> <\li>`
        }
        if(elemento.type === 'message'){
            return batePapo.innerHTML += `<li data-test="message" class="mensagem publica"> <span class="tempo"> (${elemento.time}) <\span> <span class="usuario"> ${elemento.from} <\span> <span class="texto"> para <\span> <span class="usuario"> ${elemento.to}: <\span>  <span class="texto">${elemento.text}<\span> <\li>`
        }
    })
}
document.querySelector('.corpo-de-mensagens').lastChild.scrollIntoView();

function enviar(){
    const msn = document.querySelector('.envio');
    const mensagemEnviada = document.querySelector('input').value
    const novaMensagem = {
        from: nome,
        to: "Todos",
        text: mensagemEnviada,
        type: "message"
    }
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', novaMensagem);
    promessa.then(exibeMensagens);
}