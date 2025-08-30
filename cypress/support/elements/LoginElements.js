/**
 * @description Classe criada para mapear os elementos relacionados à area de Login
 */

class LoginElements {

    inputEmail = () => cy.get('#email');
    inputSenha = () => cy.get('#password');
    botaoEntrar = () => cy.get('[data-testid="entrar"]');
}

export const e = new LoginElements()