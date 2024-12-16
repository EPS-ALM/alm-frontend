import { useState } from "react";
import ChatBot from "react-chatbotify";
import "./ChatBot.css";

const MyChatBot = () => {
  const [form, setForm] = useState<any>({});
  const formStyle = {
    marginTop: 10,
    marginLeft: 20,
    backgroundColor: "gray",
    border: "1px solid #491d8d",
    padding: 10,
    borderRadius: 5,
    maxWidth: 300,
  };

  const flow = {
    start: {
      message: "Olá! Meu nome é Cleiton e eu vou lhe ajudar a garantir a sua aposentadoria!",
      transition: { duration: 1000 },
      chatDisabled: true,
      path: "ask_name",
    },
    ask_name: {
      message: "Para começarmos, qual o seu nome?",
      function: (params: any) => setForm({ ...form, name: params.userInput }),
      path: "show_welcome",
    },
    show_welcome: {
      message: `Prazer em conhecê-lo, ${form.name}!`,
      transition: { duration: 1000 },
      chatDisabled: true,
      path: "ask_years_to_retire",
    },
    ask_years_to_retire: {
      message: `Em quantos anos você pretende se aposentar? Seria o período em que você estaria investindo no seu futuro!`,
      checkboxes: { items: ["3 anos", "5 anos", "10 anos", "15 anos", "20 ou mais anos"], max: 1 },
      chatDisabled: true,
      function: (params: any) => setForm({ ...form, yearsToRetire: params.userInput }),
      path: "ask_value_to_deposit",
    },
    ask_value_to_deposit: {
      message:
        "Durante esse período, qual o valor que você consegue se comprometer em investir mensalmente?",
      function: (params: any) => setForm({ ...form, valueToDeposit: params.userInput }),
      path: "show_prediction",
    },
    show_prediction: {
      message:
        "Analisando as suas respostas, você poderia desembolsar cerca de 30% a mais do que você investiu ao fim do período escolhido!",
      transition: { duration: 500 },
      chatDisabled: true,
      path: "show_awesome",
    },
    show_awesome: {
      message: "Que beleza!",
      transition: { duration: 1000 },
      chatDisabled: true,
      path: "ask_know_more",
    },
    ask_know_more: {
      message: "Você deseja saber mais?",
      options: ["Sim", "Não"],
      function: (params: any) => setForm({ ...form, knowMore: params.userInput }),
      path: "end",
    },
    end: {
      // message: async (params: any) => {
      //   const result = await fetchData(params);
      //   return result;
      // },
      message:
        "Para ter acesso à esse plano de aposentadoria com as melhores taxas do mercado, crie a sua conta e siga as instruções! Te vejo lá!",
      component: (
        <div style={formStyle}>
          <p>Nome: {form.name}</p>
          <p>Se aposentando em: {form.yearsToRetire}</p>
          <p>Depositando mensalmente: {form.valueToDeposit}</p>
          <p>Desembolsará: {Number(form.valueToDeposit) * 1.3}</p>
        </div>
      ),
      options: ["Fazer outra previsão"],
      chatDisabled: true,
      path: "ask_years_to_retire",
    },
  };
  return (
    <ChatBot
      flow={flow}
      settings={{
        general: { embedded: true, showFooter: false },
        chatHistory: { disabled: true },
        header: { title: "Cleiton" },
        chatWindow: { showScrollbar: true },
        notification: { disabled: true },
        chatInput: { botDelay: 2000, blockSpam: true, enabledPlaceholderText: "Escreva aqui" },
        botBubble: { simStream: true, streamSpeed: 60 },
        // audio: { disabled: false, defaultToggledOn: true },
      }}
    />
  );
};

export default MyChatBot;
