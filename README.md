# 🚀 Sistema FullStack - Painel Administrativo

Aplicação web completa com **frontend e backend**, contendo autenticação, painel administrativo e CRUD de usuários e produtos.

---

## 📌 Tecnologias Utilizadas

### Backend

* Node.js
* Express
* MongoDB + Mongoose
* JWT (autenticação)
* dotenv

### Frontend

* Next.js (App Router)
* React + TypeScript
* Tailwind CSS
* Axios

---

## 📂 Estrutura do Projeto

```
SistemaFullStack/
├── backend/
│   ├── src/
│   └── app.js
│
├── frontend/
│   ├── src/
│   └── package.json
```

---

## ⚙️ Como rodar o projeto localmente

### 🔽 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd SistemaFullStack
```

---

## 🖥️ BACKEND

### 📁 Acesse a pasta

```bash
cd backend
```

### 📦 Instalar dependências

```bash
npm install
```

### 🔐 Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do backend:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/seubanco
JWT_SECRET=sua_chave_secreta
```

> ⚠️ Nunca commitar o arquivo `.env`

---

### ▶️ Rodar o backend

```bash
npm run dev
```

ou

```bash
node app.js
```

Servidor rodará em:

```
http://localhost:3000
```

---

## 🌐 FRONTEND

### 📁 Acesse a pasta

```bash
cd frontend
```

### 📦 Instalar dependências

```bash
npm install
```

---

### ▶️ Rodar o frontend

```bash
npm run dev
```

Aplicação disponível em:

```
http://localhost:3001
```

---

## 🔐 Credenciais de acesso

Usuário admin criado via seed:

```
Email: admin@teste.com
Senha: 123456
```

---

## 📡 Endpoints principais

### Auth

* `POST /api/v1/auth/login`

### Usuários

* `GET /api/v1/users`
* `POST /api/v1/users`
* `PUT /api/v1/users/:id`
* `DELETE /api/v1/users/:id`

### Produtos

* `GET /api/v1/products`
* `POST /api/v1/products`
* `PUT /api/v1/products/:id`
* `DELETE /api/v1/products/:id`

### Dashboard

* `GET /api/v1/dashboard`

---

## ✅ Funcionalidades

* 🔐 Login com autenticação JWT
* 📊 Dashboard com dados reais
* 👥 CRUD de usuários (com validação)
* 📦 CRUD de produtos (com validação)
* 🧭 Painel administrativo com sidebar
* 🎨 Interface moderna com Tailwind

---

## 🚀 Deploy

Frontend: Vercel
Backend: Render / Railway
Banco: MongoDB Atlas

---

## 📌 Observações

* Projeto desenvolvido como desafio técnico
* Estrutura baseada em boas práticas (Controller, Service, etc.)
* Código organizado e escalável

---

## 👨‍💻 Autor

Carlos Eduardo (Cadu)