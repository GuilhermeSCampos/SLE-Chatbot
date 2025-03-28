import Fuse from "fuse.js";

export const intents = [
  {
    text: "Sou aluno",
    category: "aluno",
    keywords: ["sou aluno", "estudante", "aluno"],
  },
  {
    text: "Sou responsável",
    category: "responsavel",
    keywords: ["sou responsável", "pai", "mãe", "responsável", "responsavel"],
  },
  {
    text: "📚 Material de Estudo",
    response: "INSIRA AQUI INFORMAÇÕES SOBRE MATERIAL DE ESTUDO",
    category: "material",
    type: "aluno",
    keywords: ["material", "apostila", "estudar", "Material de Estudo"],
  },
  {
    text: "📆 Calendário Escolar",
    category: "calendario",
    response: "INSIRA AQUI INFORMAÇÕES SOBRE CALENDÁRIO ESCOLAR",
    type: "aluno",
    keywords: [
      "calendário",
      "feriados",
      "aulas",
      "aula",
      "quando",
      "calendario",
      "Calendário Escolar",
    ],
  },
  {
    text: "🎉 Eventos e Atividades",
    response: "INSIRA AQUI INFORMAÇÕES SOBRE EVENTOS E ATIVIDADES",
    category: "eventos",
    type: "aluno",
    keywords: [
      "evento",
      "atividade",
      "festas",
      "festival",
      "Eventos e Atividades",
    ],
  },
  {
    text: "💡 Dicas de Estudo",
    response: "INSIRA AQUI INFORMAÇÕES SOBRE DICAS DE ESTUDO",
    category: "dicas",
    type: "aluno",
    keywords: ["estudo", "dicas", "Dicas de Estudo"],
  },
  {
    text: "📊 Boletim Escolar",
    response: "INSIRA AQUI INFORMAÇÕES SOBRE BOLETIM ESCOLAR",
    category: "boletim",
    type: ["aluno", "responsavel"],
    keywords: ["notas", "boletim", "desempenho", "Boletim Escolar"],
  },
  {
    text: "💰 Mensalidades e Pagamentos",
    response: "INSIRA AQUI INFORMAÇÕES SOBRE MENSALIDADE E PAGAMENTOS",
    category: "pagamentos",
    type: "responsavel",
    keywords: [
      "mensalidade",
      "pagamento",
      "cobrança",
      "cobranca",
      "Mensalidades e Pagamentos",
    ],
  },
  {
    text: "📅 Reuniões e Eventos",
    response: "INSIRA AQUI INFORMAÇÕES SOBRE MATERIAL DE ESTUDO",
    category: "reunioes",
    type: "responsavel",
    keywords: [
      "reunioes",
      "eventos",
      "reuniao",
      "reunião",
      "Reuniões e Eventos",
    ],
  },
  {
    text: "📞 Fale com a Escola",
    response: "INSIRA AQUI INFORMAÇÕES SOBRE CONTATO",
    category: "contato",
    type: "responsavel",
    keywords: ["falar", "contato", "Fale com a Escola"],
  },
];

// Configuração do Fuse.js para busca aproximada
export const fuse = new Fuse(intents, {
  keys: ["keywords"],
  threshold: 0.5, // Ajuste para controlar o nível de precisão (0 = exato, 1 = qualquer coisa parecida)
});
