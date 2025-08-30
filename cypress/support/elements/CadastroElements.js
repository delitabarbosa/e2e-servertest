/**
 * @description Classe criada para mapear os elementos relacionados à area de Login
 */

class cadastroElements {

    inputNome = () => cy.get('#nome');
    inputEmail = () => cy.get('#email');
    inputSenha = () => cy.get('#password');
    checkBoxAdministrador = () => cy.get('#administrador');
    botaoCadastrar = () => cy.get('[data-testid="cadastrar"]');
}

export const e = new cadastroElements()