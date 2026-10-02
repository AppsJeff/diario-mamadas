# Diário de Mamadas: como colocar o app no ar

É o mesmo caminho da Casa Saturno: o app fica no GitHub Pages e os dados ficam no Firebase. Use um projeto Firebase **novo**, só para o bebê, para não misturar com os dados da gravadora.

## 1. Criar o projeto no Firebase
1. Entre em https://console.firebase.google.com e clique em **Adicionar projeto**. Sugestão de nome: `diario-mamadas`. O Google Analytics pode ficar desligado.
2. No menu lateral, abra **Firestore Database** e clique em **Criar banco de dados**. Escolha o local `southamerica-east1 (São Paulo)` e o **modo de produção**.

## 2. Liberar o acesso ao banco de dados
1. No Firebase, vá em **Firestore Database**, depois na aba **Regras**.
2. Apague o que estiver lá, cole o conteúdo inteiro do arquivo `firestore.rules` desta pasta e clique em **Publicar**.
3. O Firebase pode mostrar um aviso de que as regras estão "públicas". Isso é esperado: o app não tem login, então quem tiver o link consegue ver e registrar.

## 3. Conectar o app ao projeto
1. No Firebase, clique na engrenagem ao lado de "Visão geral do projeto" e depois em **Configurações do projeto**.
2. Em **Seus apps**, clique no ícone **</>** (Web). Dê um apelido, como `Mamadas`, e **não** marque Firebase Hosting.
3. Aparece um bloco com `apiKey`, `authDomain`, `projectId` e outros dados. Abra o arquivo `config.js` e troque cada `COLE_AQUI` pelo valor correspondente, mantendo as aspas.

## 4. Publicar no GitHub Pages
1. No GitHub (conta AppsJeff), crie um repositório novo, por exemplo `diario-mamadas`. Ele pode ser público.
2. Clique em **Add file**, depois em **Upload files**, e arraste **todos** os arquivos desta pasta, incluindo a pasta `icons`. Depois clique em **Commit changes**.
3. Vá em **Settings**, depois em **Pages**. Em "Branch", escolha `main` e `/ (root)` e clique em **Save**.
4. Em um ou dois minutos, o app estará em `https://appsjeff.github.io/diario-mamadas/`.

Se quiser um domínio próprio, use o mesmo processo que você fez para a Casa Saturno (Settings, depois Pages, depois Custom domain).

## 5. Instalar no celular
- **iPhone:** abra o link no **Safari**, toque em **Compartilhar** e depois em **Adicionar à Tela de Início**.
- **Android:** abra no **Chrome**, toque no menu **⋮** e depois em **Instalar app** (ou **Adicionar à tela inicial**).

O app abre direto, sem login. Instale nos dois celulares: os registros aparecem nos dois.

## Bom saber
- **Sem internet:** dá para registrar mesmo assim. O app guarda o registro no aparelho e envia quando a conexão voltar.
- **Atualizar o app:** quando eu te mandar uma versão nova, suba o `index.html` novo no GitHub. Abra o `sw.js` e mude `mamadas-v1` para `mamadas-v2` (e assim por diante), para os celulares pegarem a atualização. **Não** suba de novo o `config.js` em branco: o seu já tem os dados do Firebase.
- **Privacidade:** como não há login, não compartilhe o link fora da família.
- **Problemas:**
  - "O banco de dados recusou o acesso": as regras do passo 2 não foram publicadas.
  - "Falta configurar o Firebase": o `config.js` ainda está com `COLE_AQUI`.
