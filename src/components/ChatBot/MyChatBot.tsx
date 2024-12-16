import { useState } from "react";
import ChatBot from "react-chatbotify";
import "./ChatBot.css";

interface FormState {
  name?: string;
  yearsToRetire?: string;
  valueToDeposit?: string;
  knowMore?: string;
}

const MyChatBot = () => {
  const [form, setForm] = useState<FormState>({});

  const formStyle = {
    marginTop: 10,
    marginLeft: 20,
    backgroundColor: "white",
    border: "1px solid #491d8d",
    padding: 10,
    borderRadius: 5,
    maxWidth: 300,
    color: "#000000",
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
      message: `Analisando as suas respostas, você poderia desembolsar cerca de ${(
        0.009 *
        Number(form.yearsToRetire?.slice(0, 2)) *
        12 *
        100
      ).toFixed(0)}$ a mais do que você investiu ao fim do período escolhido!`,
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
      options: ["Claro!"],
      function: (params: any) => setForm({ ...form, knowMore: params.userInput }),
      path: "end",
    },
    end: {
      message:
        "Para ter acesso à esse plano de aposentadoria com as melhores taxas do mercado, entre em contato conosco! Te vejo lá!",
      component: (
        <div style={formStyle}>
          <p>Nome: {form.name}</p>
          <p>Se aposentando em: {form.yearsToRetire}</p>
          <p>
            Depositando mensalmente:{" "}
            {Number(form.valueToDeposit).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p>
            Desembolsará:{" "}
            {form.valueToDeposit && form.yearsToRetire
              ? calculateFinalValue(
                  Number(form.valueToDeposit),
                  parseInt(form.yearsToRetire.slice(0, 2)) * 12
                )
              : "Indefinido"}
          </p>
        </div>
      ),
      options: ["Fazer outra previsão"],
      chatDisabled: true,
      path: "ask_years_to_retire",
    },
  };

  // Função para calcular o valor final com juros compostos
  function calculateFinalValue(initialAmount: number, durationInMonths: number): string {
    const baseRate = 0.009; // Taxa base de 0.9% ao mês
    const rateIncrease = 0.001; // Aumento da taxa de 0.1% a cada 3 anos (36 meses)

    let finalValue = initialAmount;
    let currentRate = baseRate;
    let monthsPassed = 0;

    // Aplicar juros compostos para cada mês
    while (monthsPassed < durationInMonths) {
      finalValue *= 1 + currentRate; // Aplica juros compostos
      monthsPassed++;

      // A cada 36 meses (3 anos), aumentar a taxa de juros
      if (monthsPassed % 36 === 0) {
        currentRate += rateIncrease;
      }
    }

    return (finalValue * durationInMonths).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <ChatBot
      flow={flow}
      styles={{
        chatWindowStyle: {
          width: 800,
          backgroundColor: "rgb(45, 58, 58)", // Dark background color
          color: "#ffffff", // White text color
          borderRadius: "10px",
          borderColor: "none",
          boxShadow: "none",
        },
        botBubbleStyle: {
          backgroundColor: "#333333", // Darker gray for bot bubbles
          color: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)",
        },
        userBubbleStyle: {
          backgroundColor: "#333333", // Darker gray for user bubbles
          color: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)",
        },
        chatInputContainerStyle: {
          backgroundColor: "#rgb(45, 58, 58)", // Darker gray for input field
          color: "#ffffff",
          borderRadius: "10px",
          borderTop: "none",
        },
        chatInputAreaStyle: {
          minHeight: 20,
        },
        botCheckboxRowStyle: {
          backgroundColor: "#FFFFFF",
          color: "#000000",
          paddingTop: 9,
          paddingBottom: 9,
          maxHeight: 40,
          borderColor: "#FFFFFF",
        },
      }}
      settings={{
        general: { embedded: true, showFooter: false, showHeader: false },
        chatHistory: { disabled: true },
        chatWindow: { showScrollbar: false },
        notification: { disabled: true },
        chatInput: { botDelay: 2000, blockSpam: true, enabledPlaceholderText: "Escreva aqui" },
        botBubble: { simStream: true, streamSpeed: 60, showAvatar: true },
      }}
    />
  );
};

export default MyChatBot;
