function validarCNPJ(event) {
    event.preventDefault();
    const inputCnpj = document.getElementById("input-cnpj");
    const cnpjSemcaracter = inputCnpj.value.replace(/\D/g, '');
    const tdNome = document.getElementById("nome");
    const tdRazao = document.getElementById("razao-social");
    const tdAbertura = document.getElementById("dt-abertura");
    const tdSituacao = document.getElementById("situacao");
    const tdAtividade = document.getElementById("atividade");
    const tdEnderenco = document.getElementById("endereco");
    const tdTelefone = document.getElementById("telefone");
    const tdEmail = document.getElementById("email");
    const nomeSocio = document.getElementById("nomeSocio");
    const qualiSocio = document.getElementById("qualiSocio");

    if (inputCnpj.value === "" || cnpjSemcaracter.length !== 14) {
        alert("Por favor, insira um CNPJ válido.");
        return;
    }
    // console.log('CNPJ formatado:', cnpjSemcaracter);
    fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjSemcaracter}`)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Erro na consulta do CNPJ.');
            }
            return response.json();
        })
        .then(function (data) {
            console.log('Dados recebidos:', data);
            tdNome.value = data.nome_fantasia || 'N/A';
            tdRazao.value = data.razao_social || 'N/A';
            tdAbertura.value = data.data_inicio_atividade || 'N/A';
            tdSituacao.value = data.descricao_situacao_cadastral || 'N/A';
            tdAtividade.value = data.cnae_fiscal_descricao || 'N/A';
            tdEnderenco.value = `${data.logradouro}, ${data.numero} - ${data.bairro}, ${data.municipio} - ${data.uf}, ${data.cep}` || 'N/A';
            tdTelefone.value = data.ddd_telefone_1 || 'N/A';
            tdEmail.value = data.email || 'N/A';

            data.qsa.forEach(function (socio) {
                nomeSocio.value = socio.nome_socio || 'N/A';
                qualiSocio.value = socio.qualificacao_socio || 'N/A';
            })
        })
        .catch(function (error) {
            console.error('Erro:', error);
            alert('Erro ao consultar o CNPJ. Por favor, tente novamente mais tarde.');
        });
}

function armazenaDados() {
    const nomeCnpj = document.getElementById("nome").value.trim();
    const razaoSocial = document.getElementById("razao-social").value.trim();
    const dtAbertura = document.getElementById("dt-abertura").value.trim();
    const situacaoCnpj = document.getElementById("situacao").value.trim();
    const atividadeCnpj = document.getElementById("atividade").value.trim();
    const enderecoCnpj = document.getElementById("endereco").value.trim();
    const telefoneCnpj = document.getElementById("telefone").value.trim();
    const emailCnpj = document.getElementById("email").value.trim();
    const nomeSocioCnpj = document.getElementById("nomeSocio").value.trim();
    const qualiSocioCnpj = document.getElementById("qualiSocio").value.trim();
    // armazenar
    localStorage.setItem("nomeEmpresa", nomeCnpj);
    localStorage.setItem("socialRazao", razaoSocial)
    localStorage.setItem("aberturaDt", dtAbertura);
    localStorage.setItem("situacao", situacaoCnpj)
    localStorage.setItem("atividadeRamo", atividadeCnpj);
    localStorage.setItem("enderenco", enderecoCnpj)
    localStorage.setItem("telefone", telefoneCnpj);
    localStorage.setItem("email", emailCnpj)
    localStorage.setItem("nomeSocial", nomeSocioCnpj);
    localStorage.setItem("qualificaoSocio", qualiSocioCnpj)
    // pegar
    const resultNome = localStorage.getItem("nomeEmpresa");
    const resultRazaoSocial = localStorage.getItem("socialRazao");
    const resultDataAbertura = localStorage.getItem("aberturaDt");
    const resultSituacao = localStorage.getItem("situacao");
    const resultAtividade = localStorage.getItem("atividadeRamo");
    const resultEnderenco = localStorage.getItem("enderenco");
    const resultTelefone = localStorage.getItem("telefone");
    const resultEmail = localStorage.getItem("email");
    const resulNomeSocio = localStorage.getItem("nomeSocial");
    const resultQaSocio = localStorage.getItem("qualificaoSocio");
    // mostrar
    document.getElementById("cnpj-nome").textContent = resultNome;
    document.getElementById("cnpj-razao-social").textContent = resultRazaoSocial;
    document.getElementById("cnpj-dt-abertura").textContent = resultDataAbertura;
    document.getElementById("cnpj-situacao").textContent = resultSituacao;
    document.getElementById("cnpj-atividade").textContent = resultAtividade;
    document.getElementById("cnpj-endereco").textContent = resultEnderenco;
    document.getElementById("cnpj-telefone").textContent = resultTelefone;
    document.getElementById("cnpj-email").textContent = resultEmail;
    document.getElementById("cnpj-nome-socio").textContent = resulNomeSocio;
    document.getElementById("cnpj-quali-socio").textContent = resultQaSocio;


}
document.getElementById("btn-submit").addEventListener("click", armazenaDados);
document.getElementById("btn-consultar").addEventListener("click", validarCNPJ);