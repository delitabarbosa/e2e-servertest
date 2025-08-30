# 🚀 Automação E2E - ServerTest

Este projeto contém testes automatizados **E2E (end-to-end)** utilizando o **Cypress** com relatórios em **Mochawesome**.  

## 📦 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão recomendada LTS)  
- [npm](https://www.npmjs.com/)  

Verifique se já possui o Node instalado:  

```bash
node -v
npm -v
```

## ⚙️ Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-repo/e2e-serverest.git
cd e2e-serverest
npm install
```

## 🧪 Executando os testes

### 1. Rodar todos os testes no modo **headless** (linha de comando)

```bash
npm run test
```

### 2. Rodar os testes com abertura da interface gráfica do **Cypress**

```bash
npm run cy:open
```

> 💡 Este comando também limpa a pasta de **screenshots** antes de abrir o Cypress.

### 3. Rodar os testes e abrir o relatório **Mochawesome**

```bash
npm run test:report
```

Após a execução, o relatório será aberto automaticamente em:

```
cypress/reports/mochawesome/index.html
```

## 📊 Relatórios

Os relatórios são gerados utilizando o **cypress-mochawesome-reporter** e ficam disponíveis na pasta:

```
cypress/reports/mochawesome/
```

Abra o arquivo `index.html` no navegador para visualizar os resultados.

---

## ⚡ Integração Contínua (CI/CD)

### 🔎 Como funciona?
- Roda Cypress em cada **push** ou **pull request** para branch `delita`.  
- Gera relatório consolidado **Mochawesome**.  
- Faz upload do relatório como artefato no GitHub (download disponível na aba **Actions**).  
<img width="1884" height="641" alt="image" src="https://github.com/user-attachments/assets/6182dcae-3266-401d-bddb-5b0698667544" />

---

👨‍💻 Desenvolvido por **Delita Barbosa da Silva**
