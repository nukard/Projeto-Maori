# 🧩 Sistema de Componentes Dinâmicos - Maori Incorporadora

## 📋 Visão Geral

Este sistema permite que o **header** e **footer** sejam compartilhados entre todas as páginas do site, evitando duplicação de código e facilitando manutenções futuras.

## 📁 Arquivos Criados

### 1. `header.html`
- Contém todo o HTML do header da home page
- Inclui navegação, menu dropdown, contatos e logo
- Reutilizável em todas as páginas

### 2. `footer.html`
- Contém todo o HTML do footer da home page
- Inclui links, newsletter, redes sociais e informações de contato
- Reutilizável em todas as páginas

### 3. `components-loader.js`
- Sistema JavaScript que carrega os componentes dinamicamente
- Inicializa funcionalidades do header (menu dropdown)
- Fornece função global `openWhatsApp()`

### 4. `test-components.html`
- Página de teste para validar funcionamento
- Útil para debug e desenvolvimento

## 🚀 Como Implementar em uma Nova Página

### Passo 1: Incluir os estilos necessários
```html
<head>
    <!-- ... outros includes ... -->
    <link rel="stylesheet" href="styles-home.css">
    <link rel="stylesheet" href="styles-[sua-pagina].css">
</head>
```

### Passo 2: Substituir header e footer
```html
<body>
    <!-- ❌ REMOVER: <header>...</header> -->
    <!-- ✅ ADICIONAR: -->
    <div id="header-placeholder"></div>
    
    <main>
        <!-- Seu conteúdo aqui -->
    </main>
    
    <!-- ❌ REMOVER: <footer>...</footer> -->
    <!-- ✅ ADICIONAR: -->
    <div id="footer-placeholder"></div>
    
    <!-- Scripts -->
    <script src="components-loader.js"></script>
    <script src="script-[sua-pagina].js"></script>
</body>
```

### Passo 3: Atualizar o JavaScript da página
```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar carregamento dos componentes
    document.addEventListener('componentsLoaded', function() {
        // Suas inicializações aqui
        initializeSuaFuncionalidade();
    });
    
    // Fallback de segurança
    setTimeout(function() {
        if (!document.querySelector('#header-placeholder header')) {
            initializeSuaFuncionalidade();
        }
    }, 3000);
});
```

## ✅ Exemplo Implementado

A página **Fale Conosco** (`fale-conosco.html`) já foi convertida e serve como exemplo de implementação.

## 🔧 Funcionalidades Incluídas

### Header
- ✅ Logo da Maori
- ✅ Telefone clicável
- ✅ Ícones de email e WhatsApp
- ✅ Menu dropdown com duas colunas
- ✅ Navegação responsiva
- ✅ Animações suaves

### Footer
- ✅ Logo e endereço
- ✅ Links de páginas
- ✅ Informações de contato
- ✅ Newsletter
- ✅ Redes sociais

### JavaScript
- ✅ Menu dropdown funcional
- ✅ Função global `openWhatsApp()`
- ✅ Evento `componentsLoaded` para sincronização
- ✅ Tratamento de erros e fallbacks

## 🌐 Como Testar

1. **Servidor Local:** Execute um servidor HTTP local:
   ```bash
   cd /Users/ericribeiro/Desktop/cursordemo
   python3 -m http.server 8080
   ```

2. **Teste Básico:** Acesse `http://localhost:8080/test-components.html`

3. **Página Implementada:** Acesse `http://localhost:8080/fale-conosco.html`

## 🎯 Benefícios

- **DRY (Don't Repeat Yourself):** Header e footer em um só lugar
- **Manutenção Fácil:** Mudança em um arquivo reflete em todas as páginas
- **Performance:** Componentes carregados assincronamente
- **Flexibilidade:** Cada página mantém suas funcionalidades específicas
- **Compatibilidade:** Funciona com os estilos existentes

## ⚠️ Considerações Importantes

1. **CORS:** Necessário servidor HTTP para funcionar (não abre direto do arquivo)
2. **Estilos:** Incluir `styles-home.css` antes dos estilos específicos da página
3. **JavaScript:** Aguardar evento `componentsLoaded` antes de inicializar funcionalidades
4. **WhatsApp:** Função disponível globalmente após carregamento

## 🔄 Próximos Passos

Para aplicar em todas as páginas:

1. **Trabalhe Conosco** (`trabalhe-conosco.html`)
2. **Seja Fornecedor** (`seja-fornecedor.html`)
3. **Seja Imobiliária** (`seja-imobiliaria-cadastrada.html`)
4. **Sobre** (`sobre.html`)
5. **Praya** (`praya.html`)
6. **Index** (`index.html`)
7. **Home** (`index-home.html`) - pode manter original ou converter

## 📞 Suporte

Sistema desenvolvido para padronizar e otimizar o site da Maori Incorporadora. Em caso de dúvidas, consulte o código implementado em `fale-conosco.html` como referência.
