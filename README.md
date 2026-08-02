# Rede Sentinela — App (Expo / React Native)

Projeto base em **React Native + Expo**, que roda em **iOS, Android e Web**
a partir do mesmo código. Contém as duas primeiras telas do onboarding
(pós-cadastro/login):

1. `WelcomeScreen` — "Olá, bem-vinda à Rede Sentinela"
2. `SupportScreen` — "Encontre Apoio Especializado" (passo 2 de 4)

## Estrutura do projeto

```
RedeSentinela/
├── App.js                          # entrada do app
├── app.json                        # configuração do Expo
├── babel.config.js
├── package.json
└── src/
    ├── components/
    │   ├── PrimaryButton.js        # botão marrom com seta
    │   ├── ProgressDots.js         # bolinhas de progresso
    │   ├── IllustrationWelcome.js  # ilustração SVG tela 1
    │   └── IllustrationSupportCircle.js # ilustração SVG tela 2
    ├── navigation/
    │   └── AppNavigator.js         # stack de navegação
    ├── screens/
    │   ├── WelcomeScreen.js
    │   ├── SupportScreen.js
    │   └── HomeScreen.js           # placeholder pós-onboarding
    └── theme/
        └── theme.js                # cores, tipografia, espaçamentos
```

## Como rodar

### 1. Pré-requisitos
- Node.js 18+ instalado
- Um dos apps abaixo (opcional, mas recomendado):
  - **Expo Go** no seu celular (iOS/Android) — para testar rápido sem
    configurar Xcode/Android Studio
  - Xcode (para simulador iOS) ou Android Studio (para emulador Android)

### 2. Instalar dependências
Dentro da pasta do projeto:

```bash
npm install
```

### 3. Rodar

```bash
# Abre o menu do Expo (escolha web, iOS ou Android)
npm start

# Direto no navegador
npm run web

# Direto no simulador/dispositivo iOS (precisa de Mac + Xcode, ou Expo Go)
npm run ios

# Direto no emulador/dispositivo Android
npm run android
```

Ao rodar `npm start`, o terminal mostra um QR code — escaneie com o app
**Expo Go** no seu iPhone/Android para ver o app rodando no celular de
verdade, sem precisar compilar nada.

## Sobre as ilustrações

As ilustrações das duas telas (a figura em pé e o círculo de silhuetas)
são **SVGs originais e simplificados** (`react-native-svg`), inspirados
no clima das telas que você enviou (cores, formato, disposição), mas
sem reproduzir a arte original. Quando você tiver os arquivos finais de
ilustração (PNG/SVG do designer), é só substituir dentro de
`IllustrationWelcome.js` e `IllustrationSupportCircle.js` por:

```jsx
import { Image } from "react-native";
<Image source={require("../assets/onboarding-1.png")} style={{ width: 140, height: 140 }} resizeMode="contain" />
```

## Próximos passos sugeridos

- Adicionar as telas 3 e 4 do onboarding (o app já mostra "passo 2 de 4",
  então provavelmente faltam mais duas)
- Trocar `HomeScreen.js` pela tela real pós-onboarding
- Persistir se o usuário já viu o onboarding (ex.: `AsyncStorage`) para
  não mostrar de novo em próximos acessos
- Adicionar gesto de swipe entre os passos do onboarding, se quiser bem
  parecido com "arraste para o lado"
