import CadastroPage from '../../support/pages/CadastroPage';
import LoginPage from '../../support/pages/LoginPage';

describe('FrontEnd -> Cenários de Cadastro', () => {
    var nome = "Delita Barbosa da Silva"
    var email = "delita.barbosa123@gmail.com"
    var password = "456321987"

    before(() => {
        cy.log('Iniciando os testes: consultando registros no backend e realizando limpeza se necessário, para garantir um ambiente limpo e consistente.');

        cy.request('GET', `https://serverest.dev/usuarios?email=${email}`)
            .then((response) => {
                if (response.body.usuarios.length > 0) {
                    cy.log(`Foram encontrados ${response.body.usuarios.length} usuários. Avaliando necessidade de limpeza...`);
                    response.body.usuarios.forEach(usuario => {
                        cy.request('DELETE', `https://serverest.dev/usuarios/${usuario._id}`);
                    });
                } else {
                    cy.log('Nenhum usuário encontrado. Ambiente pronto para os testes.');
                }
            });
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it('CT01 - Tentar realizar cadastro de usuário sem informar "Nome"', () => {
        var mensagem = "Nome é obrigatório";

        CadastroPage.clicarNoBotaoCadastrar();
        CadastroPage.informarEmail(email);
        CadastroPage.informarSenha(password);
        CadastroPage.clicarNoBotaoCadastrar();
        CadastroPage.validarMensagem(mensagem);
    });

    it('CT02 - Tentar realizar cadastro de usuário sem informar "Email"', () => {
        var mensagem = "Email é obrigatório";

        CadastroPage.clicarNoBotaoCadastrar();
        CadastroPage.informarNome(nome);
        CadastroPage.informarSenha(password);
        CadastroPage.clicarNoBotaoCadastrar();
        CadastroPage.validarMensagem(mensagem);
    });

    it('CT03 - Tentar realizar cadastro de usuário sem informar "Password"', () => {
        var mensagem = "Password é obrigatório";

        CadastroPage.clicarNoBotaoCadastrar();
        CadastroPage.informarNome(nome);
        CadastroPage.informarEmail(email);
        CadastroPage.clicarNoBotaoCadastrar();
        CadastroPage.validarMensagem(mensagem);
    });

    it('CT04 - Realizar cadastro com sucesso', () => {
        CadastroPage.cadastrarUsuario({
            nome: nome,
            email: email,
            senha: password,
            administrador: false
        });
        LoginPage.validarLoginRealizadoComSucesso("Serverest Store");
        LoginPage.validarProdutosNaTelaDeBoasVindas([
            'Logitech MX Vertical',
            'Samsung 60 polegadas'
        ])
    });
});

describe('FrontEnd -> Cenários de Login', () => {
    var email = "delita.barbosa123@gmail.com";
    var password = "456321988";

    beforeEach(() => {
        cy.visit('/');
    });

    it('CT05 - Tentar realizar login com email e password inválidos', () => {
        var mensagem = "Email e/ou senha inválidos"

        LoginPage.informarEmail(email);
        LoginPage.informarSenha(password);
        LoginPage.clicarNoBotaoEntrar();
        LoginPage.validarMensagem(mensagem);
    });

    it('CT06 - Tentar realizar login sem informar email', () => {
        var mensagem = "Email é obrigatório"

        LoginPage.informarSenha(password);
        LoginPage.clicarNoBotaoEntrar();
        LoginPage.validarMensagem(mensagem);
    });

    it('CT07 - Tentar realizar login sem informar password', () => {
        var mensagem = "Password é obrigatório"

        LoginPage.informarEmail(email);
        LoginPage.clicarNoBotaoEntrar();
        LoginPage.validarMensagem(mensagem);
    });

    it('CT08 - Realizar login com sucesso', () => {
        password = "456321987"

        LoginPage.informarEmail(email);
        LoginPage.informarSenha(password);
        LoginPage.clicarNoBotaoEntrar();
        LoginPage.validarLoginRealizadoComSucesso("Serverest Store");
        LoginPage.validarProdutosNaTelaDeBoasVindas([
            'Logitech MX Vertical',
            'Samsung 60 polegadas'
        ])
    });
});

describe('E2E (FrontEnd e BackEnd) -> CRUD Login e Cadastro', () => {
    let usuarioId;
    let nome = "Delita Barbosa Silva"
    let email = "delita.barbosa123@gmail.com"

    before(() => {
        cy.log('Iniciando os testes: consultando registros no backend e realizando limpeza se necessário, para garantir um ambiente limpo e consistente.');

        cy.request('GET', `https://serverest.dev/usuarios?email=${email}`)
            .then((response) => {
                if (response.body.usuarios.length > 0) {
                    cy.log(`Foram encontrados ${response.body.usuarios.length} usuários. Avaliando necessidade de limpeza...`);
                    response.body.usuarios.forEach(usuario => {
                        cy.request('DELETE', `https://serverest.dev/usuarios/${usuario._id}`);
                    });
                } else {
                    cy.log('Nenhum usuário encontrado. Ambiente pronto para os testes.');
                }
            });
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it('CT09 - Cadastrar usuário e validar cadastro realizado no frontend', () => {
        var password = "456321987"
        var administrador = "false"
        var mensagem = "Cadastro realizado com sucesso"

        cy.request('POST', 'https://serverest.dev/usuarios', {
            nome: nome,
            email: email,
            password: password,
            administrador: administrador
        }).then((res) => {
            expect(res.status).to.eq(201);
            expect(res.body.message).to.eq(mensagem);
            usuarioId = res.body._id;

            cy.request('GET', `https://serverest.dev/usuarios/${usuarioId}`)
                .then((res) => {
                    expect(res.status).to.eq(200);
                    expect(res.body.nome).to.eq(nome);
                    expect(res.body.password).to.eq(password);
                    expect(res.body.administrador).to.eq(administrador);

                    LoginPage.informarEmail(email);
                    LoginPage.informarSenha(password);
                    LoginPage.clicarNoBotaoEntrar();
                    LoginPage.validarLoginRealizadoComSucesso("Serverest Store");
                    LoginPage.validarProdutosNaTelaDeBoasVindas([
                        'Logitech MX Vertical',
                        'Samsung 60 polegadas'
                    ])
                });
        });
    });

    it('CT10 - Tentar cadastrar usuário com email já existente na base', () => {
        var password = "456321987"
        var mensagem = "Este email já está sendo usado";
        var administrador = true

        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            body: {
                nome: nome,
                email: email,
                password: password,
                administrador: administrador.toString()
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.message).to.eq(mensagem);

            CadastroPage.cadastrarUsuario({
                nome: nome,
                email: email,
                senha: password,
                administrador: administrador
            });
            CadastroPage.validarMensagem(mensagem);
        });
    });

    it('CT11 - Editar usuário cadastrado atualizando-o para administrador e alterando password e validar alterações feitas no frontend', () => {
        var password = "passwordalterada123456"
        var administrador = "true"

        cy.request('PUT', `https://serverest.dev/usuarios/${usuarioId}`, {
            nome: nome,
            email: email,
            password: password,
            administrador: administrador
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.message).to.eq("Registro alterado com sucesso");

            cy.request('GET', `https://serverest.dev/usuarios/${usuarioId}`)
                .then((res) => {
                    expect(res.status).to.eq(200);
                    expect(res.body.nome).to.eq(nome);
                    expect(res.body.email).to.eq(email);
                    expect(res.body.password).to.eq(password);
                    expect(res.body.administrador).to.eq(administrador);

                    LoginPage.informarEmail(email);
                    LoginPage.informarSenha(password);
                    LoginPage.clicarNoBotaoEntrar();
                    LoginPage.validarLoginComoAdministradorRealizadoComSucesso(nome, 'Este é seu sistema para administrar seu ecommerce.');
                });
        });
    });

    it('CT12 - Excluir usuário cadastrado e validar exclusão de usuário no frontend', () => {
        var password = "passwordalterada123456"
        var mensagem = "Email e/ou senha inválidos"

        cy.request('DELETE', `https://serverest.dev/usuarios/${usuarioId}`)
            .then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body.message).to.eq("Registro excluído com sucesso");

                LoginPage.informarEmail(email);
                LoginPage.informarSenha(password);
                LoginPage.clicarNoBotaoEntrar();
                LoginPage.validarMensagem(mensagem);
            });
    });

    it('CT13 - Tentar excluir usuário que já foi excluído', () => {
        var password = "passwordalterada123456"
        var mensagem = "Email e/ou senha inválidos"

        cy.request('DELETE', `https://serverest.dev/usuarios/${usuarioId}`)
            .then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body.message).to.eq("Nenhum registro excluído");

                LoginPage.informarEmail(email);
                LoginPage.informarSenha(password);
                LoginPage.clicarNoBotaoEntrar();
                LoginPage.validarMensagem(mensagem);
            });
    });
});