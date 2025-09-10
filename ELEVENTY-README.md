# 🚀 Maori Incorporadora - Eleventy Site

Site institucional da **Maori Incorporadora** construído com [Eleventy](https://www.11ty.dev/) - um gerador de sites estáticos moderno e performático.

## 📁 Estrutura do Projeto

```
cursordemo/
├── src/                          # Código fonte
│   ├── _includes/               # Templates e componentes
│   │   ├── layouts/
│   │   │   └── base.njk        # Layout base
│   │   └── partials/
│   │       ├── header.njk      # Componente header
│   │       └── footer.njk      # Componente footer
│   └── pages/                   # Páginas do site (.njk)
│       ├── index-home.njk      # Home page
│       ├── fale-conosco.njk    # Contato
│       ├── praya.njk           # Empreendimento Praya
│       └── ...                 # Outras páginas
├── public/                      # Assets estáticos
│   ├── images/                 # Imagens
│   ├── styles-*.css           # Estilos específicos
│   ├── script-*.js            # Scripts específicos
│   ├── shared-components.css   # Estilos compartilhados
│   └── shared-components.js    # Scripts compartilhados
├── _site/                       # Site gerado (não versionar)
├── .eleventy.js                # Configuração Eleventy
└── package.json                # Dependências Node.js
```

## 🛠️ Comandos

### Desenvolvimento
```bash
npm run serve    # Servidor de desenvolvimento
npm start        # Alias para serve
```

### Produção
```bash
npm run build    # Build para produção
```

## 🎯 Vantagens da Migração

### ✅ **Performance**
- **Sites estáticos** = carregamento ultra-rápido
- **Sem JavaScript no servidor** = menor TTFB
- **Otimização automática** de assets

### ✅ **SEO**
- **HTML pré-renderizado** = melhor indexação
- **Meta tags dinâmicas** por página
- **URLs limpas** automáticas

### ✅ **Manutenção**
- **Componentes nativos** (header/footer)
- **Template inheritance** com Nunjucks
- **Mudança em 1 arquivo** = todas as páginas atualizadas

### ✅ **Desenvolvimento**
- **Hot reload** durante desenvolvimento
- **Sintaxe familiar** (HTML + template tags)
- **Build process** automatizado

## 🧩 Sistema de Componentes

### Header (`src/_includes/partials/header.njk`)
- Navegação completa
- Menu dropdown responsivo
- Contatos e redes sociais
- Logo e branding

### Footer (`src/_includes/partials/footer.njk`)
- Links institucionais
- Newsletter
- Redes sociais
- Informações de contato

### Layout Base (`src/_includes/layouts/base.njk`)
- Estrutura HTML comum
- Meta tags dinâmicas
- Carregamento de CSS/JS por página
- Inclusão automática de header/footer

## 📄 Criando Novas Páginas

1. **Criar arquivo `.njk`** em `src/pages/`:
```yaml
---
layout: layouts/base.njk
title: Título da Página
css: styles-especifico.css
js: script-especifico.js
---

<section class="hero">
  <h1>{{ title }}</h1>
  <!-- Conteúdo da página -->
</section>
```

2. **CSS/JS específicos** em `public/`
3. **Build automático** gera HTML final

## 🔗 URLs Geradas

- `src/pages/index-home.njk` → `/` (homepage)
- `src/pages/fale-conosco.njk` → `/fale-conosco/`
- `src/pages/praya.njk` → `/praya/`
- `src/pages/sobre.njk` → `/sobre/`

## 🚀 Deploy

O projeto gera arquivos estáticos na pasta `_site/` que podem ser hospedados em:
- **Netlify** (recomendado)
- **Vercel**
- **GitHub Pages**
- **AWS S3**
- Qualquer servidor web

## 🔧 Configurações

### `.eleventy.js`
- Configuração principal do Eleventy
- Pastas de input/output
- Plugins e filtros
- Passthrough de assets

### `package.json`
- Scripts de build/desenvolvimento
- Dependências do projeto
- Metadados do projeto

## 📈 Próximos Passos

1. **Otimizações de Performance**
   - Minificação CSS/JS
   - Otimização de imagens
   - Critical CSS inline

2. **SEO Avançado**
   - Sitemap.xml automático
   - Schema.org markup
   - Open Graph tags

3. **Features Avançadas**
   - Blog com Markdown
   - Sistema de busca
   - PWA capabilities

---

## 🎉 **MIGRAÇÃO CONCLUÍDA COM SUCESSO!**

O site agora roda em uma arquitetura moderna e profissional, mantendo toda a funcionalidade original mas com muito mais flexibilidade e performance.
