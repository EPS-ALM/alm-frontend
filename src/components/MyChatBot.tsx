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

  const fetchData = async (params: any) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      const data = await response.json();
      return data.title;
    } catch (error) {
      return "Oh no I don't know what to say!";
    }
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
      message: "Qual o valor que você consegue se comprometer em investir mensalmente?",
      function: (params: any) => setForm({ ...form, valueToDeposit: params.userInput }),
      path: "show_prediction",
    },
    show_prediction: {
      message:
        "Analisando as suas respostas, você poderia desembolsar cerca de 30% a mais do que você investiu ao fim do período escolhido!",
      transition: { duration: 500 },
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
      message: async (params: any) => {
        const result = await fetchData(params);
        return result;
      },
      //   message:
      //     "Para ter acesso à esse plano de aposentadoria com as melhores taxa do mercado, crie a sua conta e siga as instruções! Te vejo lá!",
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
        audio: { disabled: false, defaultToggledOn: true },
        chatInput: { botDelay: 2500, blockSpam: true, enabledPlaceholderText: "Escreva aqui" },
        botBubble: { simStream: true, streamSpeed: 80 },
      }}
    />
  );
};

export default MyChatBot;
