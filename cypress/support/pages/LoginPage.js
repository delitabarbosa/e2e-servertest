/**
 * @description Classe criada para mapear os métodos relacionados à area de Cadastro
 */

import { e } from '../elements/LoginElements';

class LoginPage {

    informarEmail(email) {
        e.inputEmail().type(email);
    }

    informarSenha(senha) {
        e.inputSenha().type(senha);
    }

    clicarNoBotaoEntrar() {
        cy.intercept('POST', '**/login').as('loginRequest');
        cy.intercept('GET', '**/usuarios').as('getUsuarios');
        e.botaoEntrar().click();
        cy.wait('@loginRequest');
    }

    validarMensagem(mensagem) {
        cy.contains('div.alert', mensagem)
    }

    validarLoginRealizadoComSucesso(mensagem) {
        cy.intercept('GET', '**/produtos').as('getProdutos');
        cy.wait('@getProdutos');
        cy.get('h1').should('contain.text', mensagem);
    }

    validarProdutosNaTelaDeBoasVindas(produtos) {
        produtos.forEach((produto) => {
            cy.get('h5.card-title.negrito')
                .should('contain.text', produto);
        });
    }

    validarLoginComoAdministradorRealizadoComSucesso(nome, mensagemAdmin) {
        cy.wait('@getUsuarios');
        cy.url().should('include', '/admin/home');
        cy.get('h1').invoke('text').then((texto) => {
            expect(texto).to.contains(`Bem Vindo  ${nome}`);
        });
        cy.get('p.lead').should('contain.text', mensagemAdmin);
    }
}

export default new LoginPage();