import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  FlatList,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TextStyle,
  ImageSourcePropType,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import { colors, typography, spacing } from "../theme/theme";

const { width } = Dimensions.get("window");

const FILTERS = [
  "Como Ajudar",
  "Me Proteger",
  "Sinais de Alerta",
];

// Quantos cards de conteúdo aparecem antes de expandir
const VISIBLE_COUNT = 4;

type GuideScreenProps = {
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
};

type CarouselItem = {
  id: string;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
};

type ContentItem = {
  id: number;
  title: string;
  type: string;
  duration: string;
  image: { uri: string };
  onPress?: () => void;
};

// Cores das pílulas de tag
const TAG_COLORS: Record<
  string,
  { bg: string; text: string }
> = {
  Artigo: {
    bg: "#E8F0E3",
    text: "#4A7C59",
  },

  Vídeo: {
    bg: "#F5E6D8",
    text: "#B8860B",
  },

  "Guia Rápido": {
    bg: "#F2EFE5",
    text: "#A0522D",
  },
};

// ============================================================
// CARROSSEL
// ============================================================

const GUIA_IMAGE_URL =
  "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=1000&h=560&fit=crop&crop=entropy&auto=format&q=80";

const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: "1",
    title: "Aprenda a se proteger",
    subtitle: "Conhecimento é a melhor defesa",
    image: { uri: GUIA_IMAGE_URL },
  },

  {
    id: "2",
    title: "Conheça seus direitos",
    subtitle: "Informação é poder",
    image: { uri: GUIA_IMAGE_URL },
  },

  {
    id: "3",
    title: "Fale com quem entende",
    subtitle: "Apoio especializado 24h",
    image: { uri: GUIA_IMAGE_URL },
  },
];

export default function GuideScreen({
  navigation,
}: GuideScreenProps) {
  const { height } = useWindowDimensions();

  const isSmallScreen = height < 700;
  const carouselHeight = isSmallScreen ? 150 : 190;

  const [activeFilter, setActiveFilter] =
    useState<string>(FILTERS[0]);

  const [activeSlide, setActiveSlide] =
    useState<number>(0);

  const [showAllContent, setShowAllContent] =
    useState<boolean>(false);

  const flatListRef =
    useRef<FlatList<CarouselItem>>(null);

  const intervalRef =
    useRef<ReturnType<typeof setInterval> | null>(null);

  // ============================================================
  // AUTOPLAY
  // ============================================================

  useEffect(() => {
    startAutoplay();

    return () => stopAutoplay();
  }, []);

  const startAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const next =
        (activeSlide + 1) % CAROUSEL_ITEMS.length;

      goToSlide(next);
    }, 5000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const goToSlide = (index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });

    setActiveSlide(index);

    stopAutoplay();
    startAutoplay();
  };

  const nextSlide = () => {
    const next =
      (activeSlide + 1) % CAROUSEL_ITEMS.length;

    goToSlide(next);
  };

  const prevSlide = () => {
    const prev =
      (activeSlide -
        1 +
        CAROUSEL_ITEMS.length) %
      CAROUSEL_ITEMS.length;

    goToSlide(prev);
  };

  // ============================================================
  // NAVEGAÇÃO
  // ============================================================

  function handleNavigate(key: string) {
    if (key === "Home") {
      navigation.navigate("Home");
    }

    if (key === "Report") {
      navigation.navigate("Security");
    }

    if (key === "Profile") {
      navigation.navigate("Profile");
    }
  }

  // ============================================================
  // DETALHES DOS GUIAS
  // ============================================================

  const openGuideDetail =
    (params: {
      title: string;
      type: string;
      category: string;
      image: string;
      sections: any[];
    }) =>
    () =>
      navigation.navigate("GuideDetail", params);

  // ============================================================
  // CONTEÚDOS
  // ============================================================

  const contentData: ContentItem[] = [
    {
      id: 1,

      title: "Como ajudar uma amiga em risco",

      type: "Artigo",

      duration: "5 min de leitura",

      image: {
        uri: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=200&h=200&fit=crop&crop=center",
      },

      onPress: openGuideDetail({
        title: "Como ajudar uma amiga em risco",

        type: "Artigo",

        category: "Ajudando Amigas",

        image:
          "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=800&h=500&fit=crop&crop=center",

        sections: [
          {
            type: "paragraph",
            text: "Perceber que alguém que amamos pode estar em uma situação de vulnerabilidade é assustador. Mas sua presença e seu suporte podem ser o primeiro passo para a segurança dela.",
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Como identificar os sinais",
            icon: "eye-outline",
            color: "#4A7C59",
          },

          {
            type: "item",
            title: "Mudanças de Comportamento",
            description:
              "Isolamento social repentino, cancelamentos frequentes ou perda de interesse em atividades que ela amava.",
          },

          {
            type: "item",
            title: "Sinais Físicos",
            description:
              "Marcas inexplicáveis, uso de roupas inadequadas ao clima (para cobrir o corpo) ou aparência exausta.",
          },

          {
            type: "item",
            title: "Dependência de Controle",
            description:
              "Ela precisa pedir permissão para tudo ou é monitorada constantemente pelo parceiro via celular.",
          },

          {
            type: "item",
            title: "Alterações de Humor",
            description:
              "Ansiedade elevada, sobressaltos, ou uma postura excessivamente defensiva sobre o relacionamento.",
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "O que dizer (e o que não dizer)",
            icon: "mail-outline",
            color: "#7A4A1E",
          },

          {
            type: "paragraph",
            text: "Saber o que falar e como abordar o assunto é fundamental para não piorar a situação da vítima.",
          },

          {
            type: "checklist",
            items: [
              "Estou aqui para você, não importa o que aconteça.",
              "A culpa não é sua. Ninguém merece passar por isso.",
              "Eu acredito em você e no que você está me contando.",
            ],
          },

          {
            type: "xlist",
            items: [
              "Por que você simplesmente não vai embora?",
              "Eu te avisei que ele não prestava.",
              "Você deve ter feito algo para ele reagir assim.",
            ],
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Como oferecer ajuda prática",
            icon: "hand-left-outline",
            color: "#4A7C59",
          },

          {
            type: "item",
            title: "Porto Seguro",
            description:
              "Ofereça sua casa para ela guardar documentos importantes ou uma mochila de emergência com itens essenciais.",
            icon: "key-outline",
            iconColor: "#B8860B",
          },

          {
            type: "item",
            title: "Canal de Comunicação",
            description:
              "Estabeleça uma palavra-código ou um sinal discreto para que ela possa te avisar se estiver em perigo imediato.",
            icon: "call-outline",
            iconColor: "#2E7D32",
          },

          {
            type: "item",
            title: "Pesquisa Segura",
            description:
              "Ofereça-se para pesquisar serviços de suporte, delegacias ou ONGs usando seu próprio dispositivo, para não deixar rastros no dela.",
            icon: "search-outline",
            iconColor: "#2C7A9E",
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Cuidando de você também",
            icon: "heart-outline",
            color: "#4A7C59",
          },

          {
            type: "paragraph",
            text: "Apoiar alguém em situação de violência pode ser emocionalmente desgastante. É importante que você também cuide da sua saúde mental:",
          },

          {
            type: "bullet",
            items: [
              "Busque apoio para você também",
              "Estabeleça limites saudáveis",
              "Não se culpe pelo que está fora do seu controle",
              "Reconheça seus próprios limites",
              "Busque informações sobre o assunto para se sentir mais preparado",
            ],
          },
        ],
      }),
    },

    {
      id: 2,

      title: "Guia de segurança digital",

      type: "Vídeo",

      duration: "12 min",

      image: {
        uri: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=200&h=200&fit=crop&crop=center",
      },

      onPress: openGuideDetail({
        title: "Guia de segurança digital",

        type: "Vídeo",

        category: "Segurança Digital",

        image:
          "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=800&h=500&fit=crop&crop=center",

        sections: [
          {
            type: "paragraph",
            text: "O celular e as redes sociais podem ser ferramentas de apoio, mas também podem ser usados para monitorar e controlar. Pequenos cuidados fazem grande diferença na sua segurança digital.",
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Proteja seus dispositivos",
            icon: "lock-closed-outline",
            color: "#4A7C59",
          },

          {
            type: "item",
            title: "Senhas fortes e únicas",
            description:
              "Use senhas diferentes em cada app e troque-as se desconfiar que alguém teve acesso.",
            icon: "key-outline",
            iconColor: "#B8860B",
          },

          {
            type: "item",
            title: "Verificação em duas etapas",
            description:
              "Ative sempre que possível — assim, mesmo com a senha, ninguém entra sem o segundo código.",
            icon: "shield-checkmark-outline",
            iconColor: "#2E7D32",
          },

          {
            type: "item",
            title: "Permissões de localização",
            description:
              "Revise quais aplicativos têm acesso à sua localização e desative os que não precisam disso.",
            icon: "location-outline",
            iconColor: "#2C7A9E",
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Sinais de que você pode estar sendo monitorada",
            icon: "alert-circle-outline",
            color: "#7A4A1E",
          },

          {
            type: "bullet",
            items: [
              "O parceiro sabe onde você esteve sem você ter contado",
              "Ele conhece conversas privadas suas",
              "Seu celular apresenta comportamento estranho, como bateria acabando rápido",
              "Aplicativos desconhecidos aparecem instalados",
            ],
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Se precisar se comunicar em segurança",
            icon: "chatbubble-ellipses-outline",
            color: "#4A7C59",
          },

          {
            type: "checklist",
            items: [
              "Use um dispositivo ou conta que a outra pessoa não conheça",
              "Apague o histórico de buscas sensíveis após pesquisar",
              "Combine um contato de confiança para avisos rápidos",
            ],
          },
        ],
      }),
    },

    {
      id: 3,

      title: "Ciclo da violência: como identificar",

      type: "Guia Rápido",

      duration: "8 min de leitura",

      image: {
        uri: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=200&h=200&fit=crop&crop=center",
      },

      onPress: openGuideDetail({
        title: "Ciclo da violência: como identificar",

        type: "Guia Rápido",

        category: "Entendendo o Ciclo",

        image:
          "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=500&fit=crop&crop=center",

        sections: [
          {
            type: "paragraph",
            text: "A violência doméstica costuma seguir um padrão que se repete. Entender essas fases ajuda a reconhecer o que está acontecendo e a não naturalizar o que não é normal.",
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "As três fases do ciclo",
            icon: "repeat-outline",
            color: "#4A7C59",
          },

          {
            type: "item",
            title: "1. Acúmulo de tensão",
            description:
              "Pequenos atritos, irritabilidade e cobranças aumentam. A pessoa agredida costuma tentar 'acalmar' o outro para evitar conflitos.",
          },

          {
            type: "item",
            title: "2. Explosão",
            description:
              "A tensão se transforma em agressão verbal, psicológica, física ou sexual. É a fase mais visível e perigosa do ciclo.",
          },

          {
            type: "item",
            title: "3. Lua de mel",
            description:
              "O agressor pede desculpas, promete mudar e pode até parecer a pessoa gentil do início do relacionamento — até o ciclo recomeçar.",
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Por que é difícil sair",
            icon: "heart-outline",
            color: "#7A4A1E",
          },

          {
            type: "paragraph",
            text: "A fase de 'lua de mel' cria esperança de mudança, o que dificulta o rompimento. Além disso, medo, dependência financeira e vínculo afetivo tornam a saída um processo, não um momento único.",
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "O que observar",
            icon: "eye-outline",
            color: "#4A7C59",
          },

          {
            type: "bullet",
            items: [
              "O intervalo entre as fases está diminuindo?",
              "A intensidade das agressões está aumentando?",
              "As desculpas já não convencem mais como antes?",
            ],
          },
        ],
      }),
    },

    {
      id: 4,

      title: "Direitos da mulher: o que você precisa saber",

      type: "Artigo",

      duration: "10 min de leitura",

      image: {
        uri: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=200&h=200&fit=crop&crop=center",
      },

      onPress: openGuideDetail({
        title: "Direitos da mulher: o que você precisa saber",

        type: "Artigo",

        category: "Seus Direitos",

        image:
          "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&h=500&fit=crop&crop=center",

        sections: [
          {
            type: "paragraph",
            text: "Conhecer seus direitos é uma ferramenta de proteção. A Lei Maria da Penha (Lei 11.340/2006) garante uma série de medidas para mulheres em situação de violência doméstica e familiar.",
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Medidas protetivas de urgência",
            icon: "shield-checkmark-outline",
            color: "#4A7C59",
          },

          {
            type: "item",
            title: "Afastamento do agressor",
            description:
              "O juiz pode determinar que o agressor se afaste do lar, do local de trabalho e de locais frequentados por você.",
            icon: "home-outline",
            iconColor: "#2E7D32",
          },

          {
            type: "item",
            title: "Proibição de aproximação",
            description:
              "Pode ser fixada uma distância mínima e proibido qualquer tipo de contato, inclusive por terceiros ou redes sociais.",
            icon: "hand-left-outline",
            iconColor: "#C62828",
          },

          {
            type: "item",
            title: "Suspensão de posse de arma",
            description:
              "Quando o agressor possui arma de fogo, o porte pode ser suspenso e a arma recolhida.",
            icon: "alert-circle-outline",
            iconColor: "#B8860B",
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Atendimento e apoio",
            icon: "people-outline",
            color: "#7A4A1E",
          },

          {
            type: "bullet",
            items: [
              "Atendimento prioritário em delegacias especializadas (DEAMs)",
              "Acompanhamento psicológico e social gratuito pela rede pública",
              "Sigilo dos seus dados durante o processo",
              "Prioridade na definição da guarda dos filhos, quando cabível",
            ],
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Como solicitar",
            icon: "document-text-outline",
            color: "#4A7C59",
          },

          {
            type: "paragraph",
            text: "As medidas protetivas podem ser solicitadas em uma delegacia, com ou sem boletim de ocorrência, ou diretamente ao Ministério Público e à Defensoria Pública. Você tem direito a assistência jurídica gratuita.",
          },
        ],
      }),
    },

    {
      id: 5,

      title: "Como reconhecer relacionamentos abusivos",

      type: "Vídeo",

      duration: "15 min",

      image: {
        uri: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=200&h=200&fit=crop&crop=center",
      },

      onPress: openGuideDetail({
        title: "Como reconhecer relacionamentos abusivos",

        type: "Vídeo",

        category: "Sinais de Alerta",

        image:
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=500&fit=crop&crop=center",

        sections: [
          {
            type: "paragraph",
            text: "Relacionamentos abusivos raramente começam com violência física. O controle costuma se instalar aos poucos, disfarçado de cuidado ou ciúme.",
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Sinais de controle",
            icon: "alert-circle-outline",
            color: "#7A4A1E",
          },

          {
            type: "bullet",
            items: [
              "Ciúme excessivo tratado como prova de amor",
              "Controle de roupas, amizades ou redes sociais",
              "Isolamento gradual da família e amigos",
              "Checagem constante do celular ou da localização",
            ],
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Sinais emocionais e psicológicos",
            icon: "heart-outline",
            color: "#4A7C59",
          },

          {
            type: "item",
            title: "Humilhações disfarçadas de brincadeira",
            description:
              "Comentários que diminuem sua autoestima, seguidos de 'era só brincadeira'.",
            icon: "sad-outline",
            iconColor: "#C62828",
          },

          {
            type: "item",
            title: "Culpa invertida",
            description:
              "Você se sente responsável pelas explosões de raiva dele, mesmo sem ter feito nada de errado.",
            icon: "swap-horizontal-outline",
            iconColor: "#B8860B",
          },

          {
            type: "item",
            title: "Medo de contrariar",
            description:
              "Você calcula cada palavra antes de falar, com medo da reação dele.",
            icon: "eye-outline",
            iconColor: "#2C7A9E",
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Você merece um relacionamento em que:",
            icon: "checkmark-circle-outline",
            color: "#4A7C59",
          },

          {
            type: "checklist",
            items: [
              "Suas opiniões são respeitadas",
              "Você pode ter amigos e espaço próprio",
              "Discordar não gera punição ou silêncio",
              "Você se sente segura para ser você mesma",
            ],
          },
        ],
      }),
    },

    {
      id: 6,

      title: "Onde buscar ajuda: guia de serviços",

      type: "Guia Rápido",

      duration: "6 min de leitura",

      image: {
        uri: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=200&h=200&fit=crop&crop=center",
      },

      onPress: openGuideDetail({
        title: "Onde buscar ajuda: guia de serviços",

        type: "Guia Rápido",

        category: "Rede de Apoio",

        image:
          "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=500&fit=crop&crop=center",

        sections: [
          {
            type: "paragraph",
            text: "Você não precisa enfrentar isso sozinha. Existem serviços gratuitos e especializados para te apoiar em cada etapa.",
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Contatos essenciais",
            icon: "call-outline",
            color: "#4A7C59",
          },

          {
            type: "item",
            title: "Central de Atendimento à Mulher — 180",
            description:
              "Funciona 24h, gratuito, e orienta sobre seus direitos e serviços disponíveis na sua região.",
            icon: "call-outline",
            iconColor: "#2E7D32",
          },

          {
            type: "item",
            title: "Polícia Militar — 190",
            description:
              "Para situações de risco imediato ou emergência.",
            icon: "warning-outline",
            iconColor: "#C62828",
          },

          {
            type: "item",
            title: "Delegacias especializadas (DEAMs)",
            description:
              "Atendimento presencial focado em violência contra a mulher, com equipe capacitada.",
            icon: "location-outline",
            iconColor: "#2C7A9E",
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Outros tipos de apoio",
            icon: "people-outline",
            color: "#7A4A1E",
          },

          {
            type: "bullet",
            items: [
              "ONGs locais com abrigo temporário e apoio jurídico",
              "Centros de Referência de Assistência Social (CRAS/CREAS)",
              "Defensoria Pública para assistência jurídica gratuita",
              "Postos de saúde para acompanhamento médico e psicológico",
            ],
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Antes de buscar ajuda",
            icon: "checkmark-circle-outline",
            color: "#4A7C59",
          },

          {
            type: "checklist",
            items: [
              "Salve os contatos em local de fácil acesso",
              "Compartilhe esses números com uma pessoa de confiança",
              "Se possível, memorize ao menos o 180 e o 190",
            ],
          },
        ],
      }),
    },

    {
      id: 7,

      title: "Autocuidado e saúde mental",

      type: "Artigo",

      duration: "7 min de leitura",

      image: {
        uri: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=200&h=200&fit=crop&crop=center",
      },

      onPress: openGuideDetail({
        title: "Autocuidado e saúde mental",

        type: "Artigo",

        category: "Bem-estar",

        image:
          "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=500&fit=crop&crop=center",

        sections: [
          {
            type: "paragraph",
            text: "Viver situações de tensão, medo ou violência tem um custo emocional real. Cuidar da sua saúde mental não é luxo — é parte do processo de se proteger.",
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Sinais de sobrecarga emocional",
            icon: "alert-circle-outline",
            color: "#7A4A1E",
          },

          {
            type: "bullet",
            items: [
              "Dificuldade para dormir ou pesadelos frequentes",
              "Ansiedade constante ou sensação de alerta permanente",
              "Tristeza profunda ou perda de interesse nas coisas",
              "Sensação de estar 'desligada' das próprias emoções",
            ],
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Formas de cuidado",
            icon: "heart-outline",
            color: "#4A7C59",
          },

          {
            type: "item",
            title: "Apoio psicológico",
            description:
              "Postos de saúde, universidades e ONGs costumam oferecer atendimento psicológico gratuito ou a preço social.",
            icon: "medkit-outline",
            iconColor: "#2E7D32",
          },

          {
            type: "item",
            title: "Rede de confiança",
            description:
              "Manter contato com pessoas em quem você confia ajuda a não enfrentar tudo sozinha.",
            icon: "people-outline",
            iconColor: "#2C7A9E",
          },

          {
            type: "item",
            title: "Pequenos rituais de cuidado",
            description:
              "Respirar fundo, escrever o que sente ou reservar um momento do dia só para você já fazem diferença.",
            icon: "leaf-outline",
            iconColor: "#B8860B",
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Lembre-se",
            icon: "sparkles-outline",
            color: "#4A7C59",
          },

          {
            type: "checklist",
            items: [
              "Você não é responsável pelo que o outro faz",
              "Pedir ajuda é um ato de força, não de fraqueza",
              "Seu tempo de cura é só seu — não precisa se comparar",
            ],
          },
        ],
      }),
    },

    {
      id: 8,

      title: "Como denunciar de forma segura",

      type: "Vídeo",

      duration: "9 min",

      image: {
        uri: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&h=200&fit=crop&crop=center",
      },

      onPress: openGuideDetail({
        title: "Como denunciar de forma segura",

        type: "Vídeo",

        category: "Denúncia Segura",

        image:
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop&crop=center",

        sections: [
          {
            type: "paragraph",
            text: "Denunciar pode ser um passo importante, mas o mais importante é que aconteça da forma mais segura possível para você.",
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Antes de denunciar",
            icon: "document-text-outline",
            color: "#4A7C59",
          },

          {
            type: "item",
            title: "Reúna provas",
            description:
              "Mensagens, prints, fotos, áudios ou boletins médicos ajudam a fundamentar a denúncia.",
            icon: "camera-outline",
            iconColor: "#2E7D32",
          },

          {
            type: "item",
            title: "Guarde em local seguro",
            description:
              "Salve cópias na nuvem ou com uma pessoa de confiança, fora do alcance do agressor.",
            icon: "cloud-upload-outline",
            iconColor: "#2C7A9E",
          },

          {
            type: "item",
            title: "Planeje o momento",
            description:
              "Se possível, escolha um momento em que você esteja segura para ir à delegacia ou fazer contato.",
            icon: "calendar-outline",
            iconColor: "#B8860B",
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Como denunciar",
            icon: "call-outline",
            color: "#7A4A1E",
          },

          {
            type: "bullet",
            items: [
              "Presencialmente em uma delegacia especializada (DEAM)",
              "Pela Central de Atendimento à Mulher — 180",
              "Em caso de risco imediato, ligue 190",
              "Boletim de ocorrência pode ser feito com ou sem pedido de medida protetiva",
            ],
          },

          {
            type: "divider",
          },

          {
            type: "subtitle",
            text: "Depois de denunciar",
            icon: "shield-checkmark-outline",
            color: "#4A7C59",
          },

          {
            type: "checklist",
            items: [
              "Você pode solicitar medidas protetivas de urgência",
              "Tem direito a acompanhamento jurídico gratuito",
              "Pode pedir sigilo dos seus dados no processo",
            ],
          },
        ],
      }),
    },
  ];

  // ============================================================
  // CONTEÚDO VISÍVEL
  // ============================================================

  const visibleContent = showAllContent
    ? contentData
    : contentData.slice(0, VISIBLE_COUNT);

  // ============================================================
  // CARROSSEL
  // ============================================================

  const renderCarouselItem = ({
    item,
  }: {
    item: CarouselItem;
  }) => {
    const slideStyle = {
      width: width - 2 * spacing.lg,
      height: carouselHeight,
      position: "relative" as const,
    };

    return (
      <View style={slideStyle}>
        <Image
          source={item.image}
          style={styles.carouselImage}
          resizeMode="cover"
        />
      </View>
    );
  };

  const onScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x /
        (width - 32)
    );

    setActiveSlide(index);
  };

  // ============================================================
  // TELA
  // ============================================================

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.flex}>

        {/* HEADER */}
        <View style={styles.headerGradient}>
          <View style={styles.header}>

            <Pressable
              onPress={() => navigation.goBack()}
              hitSlop={12}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={colors.textDark}
              />
            </Pressable>

            <Text style={styles.headerTitle}>
              Guia de Apoio
            </Text>

            <Pressable
              hitSlop={12}
              style={styles.searchButton}
            >
              <Ionicons
                name="search-outline"
                size={24}
                color={colors.textDark}
              />
            </Pressable>

          </View>
        </View>

        {/* =====================================================
            SCROLL
            ===================================================== */}

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}

          // CORREÇÃO:
          // não existe mais paddingBottom: 80 aqui
          contentContainerStyle={styles.scrollContent}
        >

          {/* ===================================================
              CARROSSEL
              =================================================== */}

          <View style={styles.carouselWrapper}>

            <FlatList
              ref={flatListRef}
              data={CAROUSEL_ITEMS}
              renderItem={renderCarouselItem}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              scrollEventThrottle={16}
              decelerationRate="fast"
              snapToInterval={width - 32}
              snapToAlignment="center"
              contentContainerStyle={{
                paddingHorizontal: 16,
              }}
            />

            {/* SETA ESQUERDA */}
            <TouchableOpacity
              style={styles.arrowLeft}
              onPress={prevSlide}
            >
              <Ionicons
                name="chevron-back"
                size={26}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            {/* SETA DIREITA */}
            <TouchableOpacity
              style={styles.arrowRight}
              onPress={nextSlide}
            >
              <Ionicons
                name="chevron-forward"
                size={26}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            {/* DOTS */}
            <View style={styles.dotsContainer}>
              {CAROUSEL_ITEMS.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dot,
                    activeSlide === index &&
                      styles.dotActive,
                  ]}
                  onPress={() => goToSlide(index)}
                />
              ))}
            </View>

          </View>

          {/* ===================================================
              TÍTULO
              =================================================== */}

          <Text style={styles.title}>
            Um espaço seguro para aprender
          </Text>

          <Text style={styles.subtitle}>
            Informação é proteção. Encontre orientações
            claras e acolhedoras sobre como identificar
            riscos e buscar ajuda.
          </Text>

          {/* ===================================================
              FILTROS
              =================================================== */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersRow}
          >
            {FILTERS.map((label) => (
              <Pressable
                key={label}
                style={[
                  styles.filterChip,
                  activeFilter === label &&
                    styles.filterChipActive,
                ]}
                onPress={() =>
                  setActiveFilter(label)
                }
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === label &&
                      styles.filterTextActive,
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* ===================================================
              CABEÇALHO DOS CONTEÚDOS
              =================================================== */}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>
              CONTEÚDOS RECOMENDADOS
            </Text>

            <Pressable
              onPress={() =>
                setShowAllContent(
                  (prev) => !prev
                )
              }
            >
              <Text style={styles.seeAll}>
                {showAllContent
                  ? "Ver menos"
                  : "Ver +"}
              </Text>
            </Pressable>
          </View>

          {/* ===================================================
              CARDS
              =================================================== */}

          {visibleContent.map((item) => {
            const tagStyle =
              TAG_COLORS[item.type] ||
              TAG_COLORS.Artigo;

            return (
              <Pressable
                key={item.id}
                style={styles.contentCard}
                onPress={item.onPress}
              >
                <View style={styles.cardContent}>

                  <Image
                    source={item.image}
                    style={styles.iconContainer}
                    resizeMode="cover"
                  />

                  <View style={styles.contentInfo}>

                    <Text
                      style={styles.contentTitle}
                      numberOfLines={2}
                    >
                      {item.title}
                    </Text>

                    <View
                      style={styles.contentMeta}
                    >

                      <View
                        style={[
                          styles.tagPill,
                          {
                            backgroundColor:
                              tagStyle.bg,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.contentTag,
                            {
                              color:
                                tagStyle.text,
                            },
                          ]}
                        >
                          {item.type}
                        </Text>
                      </View>

                      <Text
                        style={
                          styles.contentDuration
                        }
                      >
                        {item.duration}
                      </Text>

                    </View>

                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#CCCCCC"
                  />

                </View>
              </Pressable>
            );
          })}

          {/* ===================================================
              CARD DE AJUDA
              =================================================== */}

          <LinearGradient
            colors={[
              colors.oliveDark,
              "#2D4A4A",
            ]}
            style={styles.helpCard}
          >
            <View
              style={
                styles.helpContentWrapper
              }
            >

              <View
                style={
                  styles.helpIconContainer
                }
              >
                <Ionicons
                  name="call-outline"
                  size={32}
                  color="#FFFFFF"
                />
              </View>

              <Text style={styles.helpTitle}>
                Precisa de ajuda agora?
              </Text>

              <Text
                style={styles.helpSubtitle}
              >
                Nossos canais de atendimento
                estão disponíveis 24h para você.
              </Text>

              <Pressable
                style={styles.helpButtonWhite}
                onPress={() => {}}
              >
                <Ionicons
                  name="call-outline"
                  size={20}
                  color={colors.brownAccent}
                />

                <Text
                  style={
                    styles.helpButtonLabelBrown
                  }
                >
                  Entre em contato com uma ONG
                </Text>
              </Pressable>

            </View>
          </LinearGradient>

        </ScrollView>
      </SafeAreaView>

      {/* =====================================================
          BOTTOM NAV
          ===================================================== */}

      <BottomNav
        activeKey="Guide"
        onNavigate={handleNavigate}
      />
    </View>
  );
}

// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: colors.creamBg,
  },

  flex: {
    flex: 1,
  },

  headerGradient: {
    backgroundColor: colors.creamBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: 8,
    paddingBottom: 14,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: colors.textDark,
    letterSpacing: 0.5,
  },

  searchButton: {
    padding: 4,
  },

  scrollView: {
    flex: 1,
  },

  // ==========================================================
  // CORREÇÃO DO ESPAÇO BRANCO
  // ==========================================================

  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 0,
  },

  carouselWrapper: {
    marginBottom: spacing.md,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.cardWhite,
    position: "relative",

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },

      android: {
        elevation: 4,
      },
    }),
  },

  carouselImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E8EDE5",
  },

  arrowLeft: {
    position: "absolute",
    left: 8,
    top: "50%",
    transform: [
      {
        translateY: -18,
      },
    ],
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 18,
    padding: 5,
    zIndex: 10,
  },

  arrowRight: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: [
      {
        translateY: -18,
      },
    ],
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 18,
    padding: 5,
    zIndex: 10,
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 8,
    backgroundColor:
      "rgba(255,255,255,0.95)",
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#D0D0D0",
    marginHorizontal: 4,
  },

  dotActive: {
    backgroundColor: colors.oliveDark,
    width: 18,
  },

  title: {
    ...typography.h1,
    fontSize: 22,
    marginBottom: spacing.xs,
  } as TextStyle,

  subtitle: {
    ...typography.body,
    fontSize: 14,
    color: colors.textBody,
    lineHeight: 20,
    marginBottom: spacing.md,
  } as TextStyle,

  filtersRow: {
    marginBottom: spacing.md,
  },

  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: colors.mintBg,
    marginRight: 8,
  },

  filterChipActive: {
    backgroundColor: colors.oliveDark,
  },

  filterText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textBody,
  },

  filterTextActive: {
    color: "#FFFFFF",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textMuted,
    letterSpacing: 0.5,
  },

  seeAll: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.brownAccent,
  },

  contentCard: {
    backgroundColor: colors.cardWhite,
    borderRadius: 14,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.divider,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },

      android: {
        elevation: 2,
      },
    }),
  },

  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginRight: spacing.sm,
    backgroundColor: colors.mintBg,
  },

  contentInfo: {
    flex: 1,
    marginRight: spacing.xs,
  },

  contentTitle: {
    ...typography.body,
    fontSize: 14,
    fontWeight: "600",
    color: colors.textDark,
    marginBottom: 4,
  } as TextStyle,

  contentMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  tagPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },

  contentTag: {
    fontSize: 11,
    fontWeight: "700",
  },

  contentDuration: {
    fontSize: 11,
    color: colors.textMuted,
  },

  // ==========================================================
  // CARD DE AJUDA
  // ==========================================================

  helpCard: {
    borderRadius: 18,
    padding: spacing.md,

    // não adicionamos marginBottom
    // para não criar espaço depois do card
    marginTop: spacing.md,
    marginBottom: 0,

    overflow: "hidden",

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },

      android: {
        elevation: 8,
      },
    }),
  },

  helpContentWrapper: {
    alignItems: "center",
  },

  helpIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor:
      "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xs,
  },

  helpTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },

  helpSubtitle: {
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },

  helpButtonWhite: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    width: "100%",
    paddingVertical: 14,
    gap: 8,
  },

  helpButtonLabelBrown: {
    color: colors.brownAccent,
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.3,
  },
});