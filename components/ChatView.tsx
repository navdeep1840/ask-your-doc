import { useState, useEffect } from "react";

import QueryInput from "./QueryInput";

type Props = {};

const ChatView = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<string>();
  const [messages, setMessages] = useState<any>([]);

  const handleSendMessage = () => {
    if (query.trim() !== "") {
      const abc = [...messages, { text: query, user: "You" }];
      setMessages([...abc]);
      setQuery("");

      // Simulate a bot reply after a short delay
      setTimeout(() => {
        setMessages([...abc, { text: "This is a bot reply.", user: "Bot" }]);
      }, 500);
    }
  };

  console.log(messages);

  useEffect(() => {
    // Simulate an initial welcome message from the bot
    setTimeout(() => {
      setMessages([...messages, { text: "Welcome to ChatGPT!", user: "Bot" }]);
    }, 1000);
  }, []);

  // async function sendQuery() {
  //   if (!query) return;
  //   setResult("");

  //   setMessages([...messages, { text: newMessage, user: "You" }]);

  //   setLoading(true);

  //   try {
  //     const result = await fetch("/api/read", {
  //       method: "POST",
  //       body: JSON.stringify(query),
  //     });

  //     const json = await result.json();

  //     console.log(`on page : ${json}`);

  //     setResult(json.data);
  //   } catch (err) {
  //     console.log(`err: `, err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  console.log(result);

  return (
    <section className="mx-12 flex flex-col justify-between h-[90vh] gap-6 self-center">
      <div className="flex-1 w-full flex flex-col  overflow-y-auto p-4 bg-white rounded-md">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-1 flex  w-fit bg-blue-300 rounded-md  text-gray-800  p-2 hover:bg-blue-500 focus:bg-blue-500 ${
              message.user === "You"
                ? "self-end text-right "
                : "self-start text-left "
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <QueryInput
        sendQuery={handleSendMessage}
        setQuery={setQuery}
        query={query}
      />
    </section>
  );
};

export default ChatView;
