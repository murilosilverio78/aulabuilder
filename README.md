# Analisador de Texto

Projeto simples em Next.js com App Router e JavaScript, pronto para publicar na Vercel.

## Requisitos

- Node.js 20.9 ou superior
- npm

## Executar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Gerar build de produção

```bash
npm run build
npm start
```

## Publicar na Vercel

1. Importe este repositório na Vercel: https://vercel.com/
2. Mantenha as configurações padrão de Next.js.
3. Clique em **Deploy**.

Não é necessário configurar variáveis de ambiente.

## Onde personalizar

- **Textos da página:** `app/page.js`
- **Cores, espaçamento e aparência:** `app/globals.css`, nas variáveis `:root`
- **Título e descrição da aba do navegador:** `app/layout.js`

O botão **Analisar** apenas copia o texto digitado para a área de resposta.
