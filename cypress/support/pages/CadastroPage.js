/**
 * @description Classe criada para mapear os métodos relacionados à area de Cadastro
 */

import { e } from '../elements/CadastroElements';

class CadastroPage {

    informarNome(nome) {
        e.inputNome().type(nome);
    }

    informarEmail(email) {
        e.inputEmail().type(email);
    }

    informarSenha(senha) {
        e.inputSenha().type(senha);
    }

    clicarEmCadastrarComoAdministrador() {
        e.checkBoxAdministrador().check().click();
    }

    clicarNoBotaoCadastrar() {
        e.botaoCadastrar().click();
    }

    validarMensagem(mensagem) {
        cy.contains('div.alert', mensagem)
    }

    cadastrarUsuario({ nome, email, senha, administrador = false }) {
        this.clicarNoBotaoCadastrar();
        this.informarNome(nome);
        this.informarEmail(email);
        this.informarSenha(senha);

        if (administrador) this.clicarEmCadastrarComoAdministrador();

        this.clicarNoBotaoCadastrar();
    }
}

export default new CadastroPage();