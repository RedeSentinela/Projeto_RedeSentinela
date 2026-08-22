import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  Dimensions,
  StatusBar,
  TextStyle,
  ImageSourcePropType,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import { colors, typography, spacing } from "../theme/theme";

// ------------------ IMAGENS DOS GUIAS ------------------
const GUIA_IMAGES = {
  guiaApoio: require("../assets/guia/01_guia_apoio.png"),
  ondeBuscarAjuda: require("../assets/guia/02_onde_buscar_ajuda.png"),
  comoDenunciar: require("../assets/guia/03_como_denunciar_segura.png"),
  segurancaDigital: require("../assets/guia/04_seguranca_digital.png"),
  cicloViolencia: require("../assets/guia/05_ciclo_da_violencia.png"),
  direitosMulher: require("../assets/guia/06_direitos_da_mulher.png"),
  autocuidado: require("../assets/guia/07_autocuidado_saude_mental.png"),
  relacionamentosAbusivos: require("../assets/guia/08_relacionamentos_abusivos.png"),
  ajudarAmiga: require("../assets/guia/09_ajudar_amiga.png"),
  ajudarAmiga_capa: require("../assets/guia/10_ajudar_amiga_capa.png"),
};

const { width } = Dimensions.get("window");

// ------------------ FILTROS ------------------
const FILTERS = ["Como Ajudar", "Me Proteger", "Sinais de Alerta"];
const VISIBLE_COUNT = 4;

// ------------------ TIPOS ------------------
type GuideScreenProps = {
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
};

type ContentItem = {
  id: number;
  title: string;
  type: string;
  duration: string;
  image: ImageSourcePropType;
  filters: string[];
  onPress?: () => void;
};

// ------------------ CORES DAS TAGS ------------------
const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Artigo: { bg: "#E8F0E3", text: "#4A7C59" },
  Vídeo: { bg: "#F5E6D8", text: "#B8860B" },
  "Guia Rápido": { bg: "#F2EFE5", text: "#A0522D" },
};

// ------------------ COMPONENTE PRINCIPAL ------------------
export default function GuideScreen({ navigation }: GuideScreenProps) {
  const [activeFilter, setActiveFilter] = useState<string>(FILTERS[0]);
  const [showAllContent, setShowAllContent] = useState<boolean>(false);

  // Navegação do BottomNav
  function handleNavigate(key: string) {
    if (key === "Home") navigation.navigate("Home");
    if (key === "Report") navigation.navigate("Security");
    if (key === "Profile") navigation.navigate("Profile");
  }

  // Abrir detalhe do guia
  const openGuideDetail =
    (params: {
      title: string;
      type: string;
      category: string;
      image: ImageSourcePropType;
      videoId?: string;
      videoCredit?: string;
      videoCreditUrl?: string;
      sections: any[];
    }) =>
    () =>
      navigation.navigate("GuideDetail", params);

  // ------------------ CONTEÚDOS (8 ITENS COMPLETOS) ------------------
  const contentData: ContentItem[] = [
    {
      id: 1,
      title: "Como ajudar uma amiga em risco",
      type: "Artigo",
      duration: "5 min de leitura",
      image: GUIA_IMAGES.ajudarAmiga_capa,
      filters: ["Como Ajudar"],
      onPress: openGuideDetail({
        title: "Como ajudar uma amiga em risco",
        type: "Artigo",
        category: "Ajudando Amigas",
        image: GUIA_IMAGES.ajudarAmiga,
        sections: [
          { type: "paragraph", text: "Perceber que alguém que amamos pode estar em uma situação de vulnerabilidade é assustador. Mas sua presença e seu suporte podem ser o primeiro passo para a segurança dela." },
          { type: "divider" },
          { type: "subtitle", text: "Como identificar os sinais", icon: "eye-outline", color: "#4A7C59" },
          { type: "item", title: "Mudanças de Comportamento", description: "Isolamento social repentino, cancelamentos frequentes ou perda de interesse em atividades que ela amava." },
          { type: "item", title: "Sinais Físicos", description: "Marcas inexplicáveis, uso de roupas inadequadas ao clima (para cobrir o corpo) ou aparência exausta." },
          { type: "item", title: "Dependência de Controle", description: "Ela precisa pedir permissão para tudo ou é monitorada constantemente pelo parceiro via celular." },
          { type: "item", title: "Alterações de Humor", description: "Ansiedade elevada, sobressaltos, ou uma postura excessivamente defensiva sobre o relacionamento." },
          { type: "divider" },
          { type: "subtitle", text: "O que dizer (e o que não dizer)", icon: "mail-outline", color: "#7A4A1E" },
          { type: "paragraph", text: "Saber o que falar e como abordar o assunto é fundamental para não piorar a situação da vítima." },
          { type: "checklist", items: ["Estou aqui para você, não importa o que aconteça.", "A culpa não é sua. Ninguém merece passar por isso.", "Eu acredito em você e no que você está me contando."] },
          { type: "xlist", items: ["Por que você simplesmente não vai embora?", "Eu te avisei que ele não prestava.", "Você deve ter feito algo para ele reagir assim."] },
          { type: "divider" },
          { type: "subtitle", text: "Como oferecer ajuda prática", icon: "hand-left-outline", color: "#4A7C59" },
          { type: "item", title: "Porto Seguro", description: "Ofereça sua casa para ela guardar documentos importantes ou uma mochila de emergência com itens essenciais.", icon: "key-outline", iconColor: "#B8860B" },
          { type: "item", title: "Canal de Comunicação", description: "Estabeleça uma palavra-código ou um sinal discreto para que ela possa te avisar se estiver em perigo imediato.", icon: "call-outline", iconColor: "#2E7D32" },
          { type: "item", title: "Pesquisa Segura", description: "Ofereça-se para pesquisar serviços de suporte, delegacias ou ONGs usando seu próprio dispositivo, para não deixar rastros no dela.", icon: "search-outline", iconColor: "#2C7A9E" },
          { type: "divider" },
          { type: "subtitle", text: "Cuidando de você também", icon: "heart-outline", color: "#4A7C59" },
          { type: "paragraph", text: "Apoiar alguém em situação de violência pode ser emocionalmente desgastante. É importante que você também cuide da sua saúde mental:" },
          { type: "bullet", items: ["Busque apoio para você também", "Estabeleça limites saudáveis", "Não se culpe pelo que está fora do seu controle", "Reconheça seus próprios limites", "Busque informações sobre o assunto para se sentir mais preparado"] },
        ],
      }),
    },
    {
      id: 2,
      title: "Guia de segurança digital",
      type: "Vídeo",
      duration: "12 min",
      image: GUIA_IMAGES.segurancaDigital,
      filters: ["Me Proteger"],
      onPress: openGuideDetail({
        title: "Guia de segurança digital",
        type: "Vídeo",
        category: "Segurança Digital",
        image: GUIA_IMAGES.segurancaDigital,
        videoId: "IphlDFNYd-k",
        videoCredit: "KaBuM!",
        videoCreditUrl: "https://www.youtube.com/watch?v=IphlDFNYd-k",
        sections: [
          { type: "paragraph", text: "O celular e as redes sociais podem ser ferramentas de apoio, mas também podem ser usados para monitorar e controlar. Pequenos cuidados fazem grande diferença na sua segurança digital." },
          { type: "divider" },
          { type: "subtitle", text: "Proteja seus dispositivos", icon: "lock-closed-outline", color: "#4A7C59" },
          { type: "item", title: "Senhas fortes e únicas", description: "Use senhas diferentes em cada app e troque-as se desconfiar que alguém teve acesso.", icon: "key-outline", iconColor: "#B8860B" },
          { type: "item", title: "Verificação em duas etapas", description: "Ative sempre que possível — assim, mesmo com a senha, ninguém entra sem o segundo código.", icon: "shield-checkmark-outline", iconColor: "#2E7D32" },
          { type: "item", title: "Permissões de localização", description: "Revise quais aplicativos têm acesso à sua localização e desative os que não precisam disso.", icon: "location-outline", iconColor: "#2C7A9E" },
          { type: "divider" },
          { type: "subtitle", text: "Sinais de que você pode estar sendo monitorada", icon: "alert-circle-outline", color: "#7A4A1E" },
          { type: "bullet", items: ["O parceiro sabe onde você esteve sem você ter contado", "Ele conhece conversas privadas suas", "Seu celular apresenta comportamento estranho, como bateria acabando rápido", "Aplicativos desconhecidos aparecem instalados"] },
          { type: "divider" },
          { type: "subtitle", text: "Se precisar se comunicar em segurança", icon: "chatbubble-ellipses-outline", color: "#4A7C59" },
          { type: "checklist", items: ["Use um dispositivo ou conta que a outra pessoa não conheça", "Apague o histórico de buscas sensíveis após pesquisar", "Combine um contato de confiança para avisos rápidos"] },
        ],
      }),
    },
    {
      id: 3,
      title: "Ciclo da violência: como identificar",
      type: "Guia Rápido",
      duration: "8 min de leitura",
      image: GUIA_IMAGES.cicloViolencia,
      filters: ["Sinais de Alerta"],
      onPress: openGuideDetail({
        title: "Ciclo da violência: como identificar",
        type: "Guia Rápido",
        category: "Entendendo o Ciclo",
        image: GUIA_IMAGES.cicloViolencia,
        sections: [
          { type: "paragraph", text: "A violência doméstica costuma seguir um padrão que se repete. Entender essas fases ajuda a reconhecer o que está acontecendo e a não naturalizar o que não é normal." },
          { type: "divider" },
          { type: "subtitle", text: "As três fases do ciclo", icon: "repeat-outline", color: "#4A7C59" },
          { type: "item", title: "1. Acúmulo de tensão", description: "Pequenos atritos, irritabilidade e cobranças aumentam. A pessoa agredida costuma tentar 'acalmar' o outro para evitar conflitos." },
          { type: "item", title: "2. Explosão", description: "A tensão se transforma em agressão verbal, psicológica, física ou sexual. É a fase mais visível e perigosa do ciclo." },
          { type: "item", title: "3. Lua de mel", description: "O agressor pede desculpas, promete mudar e pode até parecer a pessoa gentil do início do relacionamento — até o ciclo recomeçar." },
          { type: "divider" },
          { type: "subtitle", text: "Por que é difícil sair", icon: "heart-outline", color: "#7A4A1E" },
          { type: "paragraph", text: "A fase de 'lua de mel' cria esperança de mudança, o que dificulta o rompimento. Além disso, medo, dependência financeira e vínculo afetivo tornam a saída um processo, não um momento único." },
          { type: "divider" },
          { type: "subtitle", text: "O que observar", icon: "eye-outline", color: "#4A7C59" },
          { type: "bullet", items: ["O intervalo entre as fases está diminuindo?", "A intensidade das agressões está aumentando?", "As desculpas já não convencem mais como antes?"] },
        ],
      }),
    },
    {
      id: 4,
      title: "Direitos da mulher: o que você precisa saber",
      type: "Artigo",
      duration: "10 min de leitura",
      image: GUIA_IMAGES.direitosMulher,
      filters: ["Me Proteger"],
      onPress: openGuideDetail({
        title: "Direitos da mulher: o que você precisa saber",
        type: "Artigo",
        category: "Seus Direitos",
        image: GUIA_IMAGES.direitosMulher,
        sections: [
          { type: "paragraph", text: "Conhecer seus direitos é uma ferramenta de proteção. A Lei Maria da Penha (Lei 11.340/2006) garante uma série de medidas para mulheres em situação de violência doméstica e familiar." },
          { type: "divider" },
          {
            type: "highlight",
            icon: "document-text-outline",
            title: "📄 O que diz o Guia do Ministério da Saúde",
            text: "De acordo com o Guia Prático de Cuidado à Mulher em Situação de Violência (Ministério da Saúde, 2025), a violência doméstica é definida como 'qualquer ação ou omissão baseada no gênero que lhe cause morte, lesão, sofrimento físico, sexual ou psicológico e dano moral ou patrimonial'. A Lei Maria da Penha enumera cinco formas: violência física, psicológica, sexual, patrimonial e moral.",
            source: "Ministério da Saúde – Guia Prático de Cuidado à Mulher em Situação de Violência (2025)",
            url: "https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/guias-e-manuais/2025/guia-pratico-de-cuidado-a-mulher-em-situacao-de-violencia.pdf",
          },
          { type: "divider" },
          { type: "subtitle", text: "Medidas protetivas de urgência", icon: "shield-checkmark-outline", color: "#4A7C59" },
          { type: "item", title: "Afastamento do agressor", description: "O juiz pode determinar que o agressor se afaste do lar, do local de trabalho e de locais frequentados por você.", icon: "home-outline", iconColor: "#2E7D32" },
          { type: "item", title: "Proibição de aproximação", description: "Pode ser fixada uma distância mínima e proibido qualquer tipo de contato, inclusive por terceiros ou redes sociais.", icon: "hand-left-outline", iconColor: "#C62828" },
          { type: "item", title: "Suspensão de posse de arma", description: "Quando o agressor possui arma de fogo, o porte pode ser suspenso e a arma recolhida.", icon: "alert-circle-outline", iconColor: "#B8860B" },
          { type: "divider" },
          { type: "subtitle", text: "Atendimento e apoio", icon: "people-outline", color: "#7A4A1E" },
          { type: "bullet", items: ["Atendimento prioritário em delegacias especializadas (DEAMs)", "Acompanhamento psicológico e social gratuito pela rede pública", "Sigilo dos seus dados durante o processo", "Prioridade na definição da guarda dos filhos, quando cabível"] },
          { type: "divider" },
          { type: "subtitle", text: "Como solicitar", icon: "document-text-outline", color: "#4A7C59" },
          { type: "paragraph", text: "As medidas protetivas podem ser solicitadas em uma delegacia, com ou sem boletim de ocorrência, ou diretamente ao Ministério Público e à Defensoria Pública. Você tem direito a assistência jurídica gratuita." },
          { type: "divider" },
          { type: "subtitle", text: "Direitos reconhecidos pela ONU", icon: "globe-outline", color: "#7A4A1E" },
          { type: "paragraph", text: "Segundo a Organização das Nações Unidas, toda mulher tem uma série de direitos fundamentais que devem ser respeitados e protegidos internacionalmente, independente do país onde vive." },
          { type: "bullet", items: [
            "Direito à vida, à liberdade e à segurança pessoal",
            "Direito à igualdade e a não sofrer nenhuma forma de discriminação",
            "Direito à liberdade de pensamento, à informação e à educação",
            "Direito à privacidade e à saúde",
            "Direito de construir relacionamentos e planejar a própria família livremente",
            "Direito de decidir se, quando e quantos filhos ter",
            "Direito à liberdade de reunião e participação política",
            "Direito a não ser submetida a tortura ou maus-tratos",
          ] },
          { type: "divider" },
          { type: "subtitle", text: "Direitos políticos garantidos por lei", icon: "people-outline", color: "#4A7C59" },
          { type: "paragraph", text: "A Convenção sobre os Direitos Políticos da Mulher, da ONU, garante que mulheres tenham o direito de votar, de serem candidatas e de ocupar cargos públicos em igualdade de condições com os homens, sem nenhum tipo de restrição. O Brasil ratificou essa convenção em 1963, por meio do Decreto nº 52.476." },
          { type: "source", label: "Conselho Estadual dos Direitos da Mulher – PR (CEDM/PR)", url: "https://www.cedm.pr.gov.br/Pagina/Direitos-da-Mulher" },
        ],
      }),
    },
    {
      id: 5,
      title: "Como reconhecer relacionamentos abusivos",
      type: "Vídeo",
      duration: "15 min",
      image: GUIA_IMAGES.relacionamentosAbusivos,
      filters: ["Sinais de Alerta"],
      onPress: openGuideDetail({
        title: "Como reconhecer relacionamentos abusivos",
        type: "Vídeo",
        category: "Sinais de Alerta",
        image: GUIA_IMAGES.relacionamentosAbusivos,
        videoId: "VCTWIsQ9R3w",
        videoCredit: "Marcos Lacerda, psicólogo",
        videoCreditUrl: "https://www.youtube.com/watch?v=VCTWIsQ9R3w",
        sections: [
          { type: "paragraph", text: "Relacionamentos abusivos raramente começam com violência física. O controle costuma se instalar aos poucos, disfarçado de cuidado ou ciúme." },
          { type: "divider" },
          { type: "subtitle", text: "Sinais de controle", icon: "alert-circle-outline", color: "#7A4A1E" },
          { type: "bullet", items: ["Ciúme excessivo tratado como prova de amor", "Controle de roupas, amizades ou redes sociais", "Isolamento gradual da família e amigos", "Checagem constante do celular ou da localização"] },
          { type: "divider" },
          { type: "subtitle", text: "Sinais emocionais e psicológicos", icon: "heart-outline", color: "#4A7C59" },
          { type: "item", title: "Humilhações disfarçadas de brincadeira", description: "Comentários que diminuem sua autoestima, seguidos de 'era só brincadeira'.", icon: "sad-outline", iconColor: "#C62828" },
          { type: "item", title: "Culpa invertida", description: "Você se sente responsável pelas explosões de raiva dele, mesmo sem ter feito nada de errado.", icon: "swap-horizontal-outline", iconColor: "#B8860B" },
          { type: "item", title: "Medo de contrariar", description: "Você calcula cada palavra antes de falar, com medo da reação dele.", icon: "eye-outline", iconColor: "#2C7A9E" },
          { type: "divider" },
          { type: "subtitle", text: "Você merece um relacionamento em que:", icon: "checkmark-circle-outline", color: "#4A7C59" },
          { type: "checklist", items: ["Suas opiniões são respeitadas", "Você pode ter amigos e espaço próprio", "Discordar não gera punição ou silêncio", "Você se sente segura para ser você mesma"] },
        ],
      }),
    },
    {
      id: 6,
      title: "Onde buscar ajuda: guia de serviços",
      type: "Guia Rápido",
      duration: "6 min de leitura",
      image: GUIA_IMAGES.ondeBuscarAjuda,
      filters: ["Como Ajudar", "Me Proteger"],
      onPress: openGuideDetail({
        title: "Onde buscar ajuda: guia de serviços",
        type: "Guia Rápido",
        category: "Rede de Apoio",
        image: GUIA_IMAGES.ondeBuscarAjuda,
        sections: [
          { type: "paragraph", text: "Você não precisa enfrentar isso sozinha. Existem serviços gratuitos e especializados para te apoiar em cada etapa." },
          { type: "divider" },
          { type: "subtitle", text: "Contatos essenciais", icon: "call-outline", color: "#4A7C59" },
          { type: "item", title: "Central de Atendimento à Mulher — 180", description: "Funciona 24h, gratuito, e orienta sobre seus direitos e serviços disponíveis na sua região.", icon: "call-outline", iconColor: "#2E7D32" },
          { type: "item", title: "Polícia Militar — 190", description: "Para situações de risco imediato ou emergência.", icon: "warning-outline", iconColor: "#C62828" },
          { type: "item", title: "Delegacias especializadas (DEAMs)", description: "Atendimento presencial focado em violência contra a mulher, com equipe capacitada.", icon: "location-outline", iconColor: "#2C7A9E" },
          { type: "divider" },
          { type: "subtitle", text: "Outros tipos de apoio", icon: "people-outline", color: "#7A4A1E" },
          { type: "bullet", items: ["ONGs locais com abrigo temporário e apoio jurídico", "Centros de Referência de Assistência Social (CRAS/CREAS)", "Defensoria Pública para assistência jurídica gratuita", "Postos de saúde para acompanhamento médico e psicológico"] },
          { type: "divider" },
          { type: "subtitle", text: "Antes de buscar ajuda", icon: "checkmark-circle-outline", color: "#4A7C59" },
          { type: "checklist", items: ["Salve os contatos em local de fácil acesso", "Compartilhe esses números com uma pessoa de confiança", "Se possível, memorize ao menos o 180 e o 190"] },
        ],
      }),
    },
    {
      id: 7,
      title: "Autocuidado e saúde mental",
      type: "Artigo",
      duration: "7 min de leitura",
      image: GUIA_IMAGES.autocuidado,
      filters: ["Me Proteger"],
      onPress: openGuideDetail({
        title: "Autocuidado e saúde mental",
        type: "Artigo",
        category: "Bem-estar",
        image: GUIA_IMAGES.autocuidado,
        sections: [
          { type: "paragraph", text: "Viver situações de tensão, medo ou violência tem um custo emocional real. Cuidar da sua saúde mental não é luxo — é parte do processo de se proteger." },
          { type: "divider" },
          { type: "subtitle", text: "Sinais de sobrecarga emocional", icon: "alert-circle-outline", color: "#7A4A1E" },
          { type: "bullet", items: ["Dificuldade para dormir ou pesadelos frequentes", "Ansiedade constante ou sensação de alerta permanente", "Tristeza profunda ou perda de interesse nas coisas", "Sensação de estar 'desligada' das próprias emoções"] },
          { type: "divider" },
          { type: "subtitle", text: "Formas de cuidado", icon: "heart-outline", color: "#4A7C59" },
          { type: "item", title: "Apoio psicológico", description: "Postos de saúde, universidades e ONGs costumam oferecer atendimento psicológico gratuito ou a preço social.", icon: "medkit-outline", iconColor: "#2E7D32" },
          { type: "item", title: "Rede de confiança", description: "Manter contato com pessoas em quem você confia ajuda a não enfrentar tudo sozinha.", icon: "people-outline", iconColor: "#2C7A9E" },
          { type: "item", title: "Pequenos rituais de cuidado", description: "Respirar fundo, escrever o que sente ou reservar um momento do dia só para você já fazem diferença.", icon: "leaf-outline", iconColor: "#B8860B" },
          { type: "divider" },
          { type: "subtitle", text: "Lembre-se", icon: "sparkles-outline", color: "#4A7C59" },
          { type: "checklist", items: ["Você não é responsável pelo que o outro faz", "Pedir ajuda é um ato de força, não de fraqueza", "Seu tempo de cura é só seu — não precisa se comparar"] },
        ],
      }),
    },
    {
      id: 8,
      title: "Como denunciar de forma segura",
      type: "Vídeo",
      duration: "9 min",
      image: GUIA_IMAGES.comoDenunciar,
      filters: ["Me Proteger", "Como Ajudar"],
      onPress: openGuideDetail({
        title: "Como denunciar de forma segura",
        type: "Vídeo",
        category: "Denúncia Segura",
        image: GUIA_IMAGES.comoDenunciar,
        sections: [
          { type: "paragraph", text: "Denunciar pode ser um passo importante, mas o mais importante é que aconteça da forma mais segura possível para você." },
          { type: "divider" },
          { type: "subtitle", text: "Antes de denunciar", icon: "document-text-outline", color: "#4A7C59" },
          { type: "item", title: "Reúna provas", description: "Mensagens, prints, fotos, áudios ou boletins médicos ajudam a fundamentar a denúncia.", icon: "camera-outline", iconColor: "#2E7D32" },
          { type: "item", title: "Guarde em local seguro", description: "Salve cópias na nuvem ou com uma pessoa de confiança, fora do alcance do agressor.", icon: "cloud-upload-outline", iconColor: "#2C7A9E" },
          { type: "item", title: "Planeje o momento", description: "Se possível, escolha um momento em que você esteja segura para ir à delegacia ou fazer contato.", icon: "calendar-outline", iconColor: "#B8860B" },
          { type: "divider" },
          { type: "subtitle", text: "Como denunciar", icon: "call-outline", color: "#7A4A1E" },
          { type: "bullet", items: ["Presencialmente em uma delegacia especializada (DEAM)", "Pela Central de Atendimento à Mulher — 180", "Em caso de risco imediato, ligue 190", "Boletim de ocorrência pode ser feito com ou sem pedido de medida protetiva"] },
          { type: "divider" },
          { type: "subtitle", text: "Depois de denunciar", icon: "shield-checkmark-outline", color: "#4A7C59" },
          { type: "checklist", items: ["Você pode solicitar medidas protetivas de urgência", "Tem direito a acompanhamento jurídico gratuito", "Pode pedir sigilo dos seus dados no processo"] },
        ],
      }),
    },
  ];

  // Filtragem
  const filteredContent = contentData.filter((item) =>
    item.filters.includes(activeFilter)
  );
  const visibleContent = showAllContent
    ? filteredContent
    : filteredContent.slice(0, VISIBLE_COUNT);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.flex}>
        {/* HEADER COM GRADIENTE USANDO AS CORES DO TEMA */}
        <LinearGradient
          colors={[colors.oliveDark, colors.oliveLight || '#4A7C59']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </Pressable>
            <View style={styles.headerCenter}>
              <Ionicons name="shield-half-outline" size={20} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Guia de Apoio</Text>
            </View>
            <Pressable hitSlop={12} style={styles.searchButton}>
              <Ionicons name="search-outline" size={22} color="#FFFFFF" />
            </Pressable>
          </View>
        </LinearGradient>

        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 80 }]}
          showsVerticalScrollIndicator={true}
          style={styles.scrollView}
        >
          {/* BLOCO DE BOAS-VINDAS */}
          <View style={styles.welcomeBlock}>
            <View style={styles.welcomeIcon}>
              <Ionicons name="leaf-outline" size={28} color="#4A7C59" />
            </View>
            <Text style={styles.welcomeTitle}>Acolhimento e informação</Text>
            <Text style={styles.welcomeSub}>
              Encontre orientações claras e seguras para identificar riscos e buscar ajuda.
            </Text>
          </View>

          {/* FILTROS */}
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
                  activeFilter === label && styles.filterChipActive,
                ]}
                onPress={() => setActiveFilter(label)}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === label && styles.filterTextActive,
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* CONTEÚDOS */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>CONTEÚDOS RECOMENDADOS</Text>
            <Pressable onPress={() => setShowAllContent((prev) => !prev)}>
              <Text style={styles.seeAll}>
                {showAllContent ? "Ver menos" : "Ver +"}
              </Text>
            </Pressable>
          </View>

          {visibleContent.map((item) => {
            const tagStyle = TAG_COLORS[item.type] || TAG_COLORS.Artigo;
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
                    <Text style={styles.contentTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <View style={styles.contentMeta}>
                      <View
                        style={[
                          styles.tagPill,
                          { backgroundColor: tagStyle.bg },
                        ]}
                      >
                        <Text
                          style={[
                            styles.contentTag,
                            { color: tagStyle.text },
                          ]}
                        >
                          {item.type}
                        </Text>
                      </View>
                      <Text style={styles.contentDuration}>
                        {item.duration}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
                </View>
              </Pressable>
            );
          })}

          {/* CARD DE AJUDA */}
          <LinearGradient
            colors={[colors.oliveDark, colors.oliveLight || '#4A7C59']}
            style={styles.helpCard}
          >
            <View style={styles.helpContentWrapper}>
              <View style={styles.helpIconContainer}>
                <Ionicons name="call-outline" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.helpTitle}>Precisa de ajuda agora?</Text>
              <Text style={styles.helpSubtitle}>
                Nossos canais de atendimento estão disponíveis 24h para você.
              </Text>
              <Pressable style={styles.helpButtonWhite} onPress={() => {}}>
                <Ionicons name="call-outline" size={20} color={colors.brownAccent} />
                <Text style={styles.helpButtonLabelBrown}>
                  Entre em contato com uma ONG
                </Text>
              </Pressable>
            </View>
          </LinearGradient>
        </ScrollView>
      </SafeAreaView>

      <BottomNav activeKey="Guide" onNavigate={handleNavigate} />
    </View>
  );
}

// ------------------ ESTILOS ------------------
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.creamBg,
  },
  flex: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  searchButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 30,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  welcomeBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  welcomeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F0E3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 4,
  },
  welcomeSub: {
    fontSize: 14,
    color: colors.textBody,
    textAlign: 'center',
    lineHeight: 20,
  },
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
    fontWeight: '500',
    color: colors.textBody,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  seeAll: {
    fontSize: 12,
    fontWeight: '600',
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
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
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
  } as TextStyle,
  contentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tagPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  contentTag: {
    fontSize: 11,
    fontWeight: '700',
  },
  contentDuration: {
    fontSize: 11,
    color: colors.textMuted,
  },
  helpCard: {
    borderRadius: 18,
    padding: spacing.md,
    marginTop: spacing.md,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  helpContentWrapper: {
    alignItems: 'center',
  },
  helpIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  helpTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  helpSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  helpButtonWhite: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: '100%',
    paddingVertical: 14,
    gap: 8,
  },
  helpButtonLabelBrown: {
    color: colors.brownAccent,
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.3,
  },
});