var campoCNPJ = document.querySelector('#cnpj');

function atualizarPeloCNPJ() {
    let cnpj = campoCNPJ.value;
    let requestURL = `https://api.cnpjs.dev/v1/${cnpj}`;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.send();
    request.onload = function () {
        let resposta = JSON.parse(request.responseText);
        if (!resposta.erro) {
            preencherCamposDoFormulario(resposta);
        } else {
            alert("CNPJ inválido ou não encontrado.");
        }
    }
    request.onerror = function() {
        alert("Erro em localizar dados. Preencha manualmente!");
    }
}

function preencherCamposDoFormulario(dados) {
    document.getElementById('razao_social').value = dados.razao_social;
    document.getElementById('fantasia').value = dados.nome_fantasia;
    document.getElementById('situacao').value = dados.situacao_cadastral;
    document.getElementById('logradouro').value = dados.endereco.tipo_logradouro + " " + dados.endereco.logradouro;
    document.getElementById('cep').value = dados.endereco.cep;
    document.getElementById('numero').value = dados.endereco.numero;
    document.getElementById('bairro').value = dados.endereco.bairro;
    document.getElementById('municipio').value = dados.endereco.municipio;
    document.getElementById('uf').value = dados.endereco.uf;
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    atualizarPeloCNPJ();
});
