# Configuração de Deployment - Frontend

## Configuração da URL do Backend

Para configurar a URL do backend no frontend, você precisa criar um arquivo `.env` na pasta `frontend/` com o seguinte conteúdo:

```bash
REACT_APP_BACKEND_URL=https://win-back.vercel.app
```

## Passos para Configuração:

1. **Criar arquivo `.env`**:
   ```bash
   cd frontend
   cp .env.example .env
   ```

2. **Editar o arquivo `.env`**:
   ```bash
   REACT_APP_BACKEND_URL=https://win-back.vercel.app
   ```

3. **Build do projeto**:
   ```bash
   npm run build
   ```

## Deploy no Vercel (Frontend)

1. **Instalar Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel login
   vercel
   ```

3. **Configurar variáveis de ambiente no Vercel**:
   - Acesse o dashboard do Vercel
   - Vá para Settings > Environment Variables
   - Adicione: `REACT_APP_BACKEND_URL` = `https://win-back.vercel.app`

## Arquivos que usam esta configuração:

- `src/services/api.js` - Configuração do Axios
- `src/context/Socket/SocketContext.js` - Conexão Socket.IO
- `src/pages/MessagesAPI/index.js` - API de mensagens
- `public/index.html` - Favicon do backend

## Importante ⚠️

- A variável deve começar com `REACT_APP_` para ser reconhecida pelo React
- Não inclua barra `/` no final da URL
- Certifique-se de que o backend está rodando na URL configurada
- Para mudanças na variável, é necessário rebuild da aplicação


