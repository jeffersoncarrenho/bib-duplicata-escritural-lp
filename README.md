# Entrega — LP Duplicata Escritural (BIB)

Esta entrega contém a versão final aprovada da landing page da Duplicata Escritural, em dois formatos equivalentes:

- `html/` — protótipo estático (HTML/CSS/JS puro)
- `asp/` — projeto ASP.NET Core 5.0 (Razor Pages)

Os dois têm o mesmo conteúdo, visual e comportamento. A diferença é só a forma de hospedar.

## `html/` — versão estática

Arquivos: `index.html`, `completo.html`, `faq.html`, `styles.css`, `faq.css`, `deck.js`, `accordion.js` e a pasta `img/`.

Como visualizar:
- Abrir `index.html` direto no navegador, **ou**
- Servir a pasta com qualquer servidor estático (ex.: `python3 -m http.server` dentro de `html/`).

Não depende de nenhuma ferramenta de build (sem npm, sem bundler) — é só copiar a pasta para onde for hospedar.

## `asp/` — versão ASP.NET Core

Projeto Razor Pages, .NET 5, sem pacotes NuGet além do framework e sem libs JS externas (mesmo HTML/CSS/JS do protótipo, embutido nas páginas).

Requisito: SDK do .NET 5 instalado.

Rodar localmente:
```
cd asp
dotnet build
dotnet run
```
Por padrão sobe em `http://localhost:5000` (ver `Properties/launchSettings.json` para ajustar a porta).

Publicar para produção:
```
dotnet publish -c Release -o <pasta-de-saida>
```
A pasta de saída pode ser copiada direto para o servidor — não depende de build de front-end nem de ferramentas além do runtime do .NET 5.

### Rotas
| Rota | Conteúdo |
|---|---|
| `/` | Slideshow horizontal (10 slides, navegação por setas/teclado/swipe) |
| `/Completo` | Mesmos 10 blocos, empilhados, rolagem vertical (versão mobile) |
| `/Faq` | Perguntas frequentes + rodapé institucional |

## Comportamento

- **Navegação do slideshow**: setas verticais (Voltar em cima, Avançar embaixo); no último slide a seta de avançar fica dourada e volta para o primeiro slide.
- **Redirecionamento mobile**: em telas estreitas/dispositivos touch na vertical, `/` redireciona automaticamente para `/Completo` — por media query no HTML (funciona mesmo sem JS/sem servidor) e, na versão ASP, reforçado por verificação de User-Agent no servidor.

---
Entrega gerada em 20/10/2026.
