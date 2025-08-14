# Vercel Deployment Guide for WhatiCket Backend

## Importante ⚠️

Este backend possui algumas limitações quando deployado no Vercel devido à natureza serverless:

### Limitações do Vercel
1. **Socket.IO**: Funcionalidade limitada em ambiente serverless
2. **Cron Jobs**: O cron configurado no `server.ts` não funcionará
3. **Sessões WhatsApp**: Podem ter problemas de persistência
4. **Banco de dados**: Requer conexão externa (não pode usar SQLite local)
5. **Redis**: Requer instância externa
6. **Uploads**: Arquivos não persistem entre execuções

### Variáveis de Ambiente Necessárias

Configure as seguintes variáveis no painel do Vercel:

```bash
# Banco de dados
DB_DIALECT=postgres
DB_HOST=your-database-host
DB_DATABASE=your-database-name
DB_USERNAME=your-database-user
DB_PASSWORD=your-database-password
DB_PORT=5432

# Redis
IO_REDIS_SERVER=your-redis-host
IO_REDIS_PASSWORD=your-redis-password
IO_REDIS_PORT=6379
IO_REDIS_DB_SESSION=0

# JWT
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-jwt-refresh-secret

# Frontend URL
FRONTEND_URL=https://your-frontend-domain.vercel.app

# ⚠️ IMPORTANTE: Para este projeto específico, configure:
# FRONTEND_URL=https://seu-frontend.vercel.app

# WhatsApp (opcional)
WBOT_URL=your-whatsapp-api-url

# Outros
SENTRY_DSN=your-sentry-dsn
PORT=3000
```

### Passos para Deploy

1. **Build do projeto**:
   ```bash
   npm run build
   ```

2. **Conectar ao Vercel**:
   ```bash
   vercel login
   vercel
   ```

3. **Configurar domínio personalizado** (opcional)

### Alternativas Recomendadas

Para um backend completo como este, considere:

1. **Railway**: Melhor para aplicações full-stack
2. **Render**: Suporte nativo a WebSockets
3. **DigitalOcean App Platform**: Ambiente mais próximo ao tradicional
4. **Heroku**: Clássico para Node.js

### Modificações Necessárias

Se insistir em usar Vercel, considere:

1. **Separar Socket.IO**: Deploy separado para WebSockets
2. **Usar Vercel Cron**: Para tarefas agendadas
3. **Storage externo**: Para uploads (AWS S3, Cloudinary)
4. **Database externa**: PostgreSQL ou MySQL hospedado

## Estrutura do vercel.json

O arquivo `vercel.json` criado inclui:

- **Builds**: Configuração para compilar TypeScript
- **Routes**: Roteamento para Socket.IO e arquivos estáticos
- **Functions**: Configuração de timeout e memória
- **Environment**: Variáveis de ambiente
- **Regions**: Servidor na região do Brasil (gru1)

## Comandos Úteis

```bash
# Deploy local
vercel dev

# Deploy para produção
vercel --prod

# Ver logs
vercel logs

# Configurar domínio
vercel domains add your-domain.com
```
