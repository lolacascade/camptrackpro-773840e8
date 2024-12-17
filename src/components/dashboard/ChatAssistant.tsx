import { useEffect, useState } from "react";
import { ChatInput } from "@/components/dashboard/chat/ChatInput";

const INITIAL_SUGGESTIONS = [
  "What's the current occupancy rate?",
  "Which sites are available this weekend?",
  "Show me maintenance requests for Zone A",
  "What's the revenue forecast for next month?"
];

export function ChatAssistant() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>(INITIAL_SUGGESTIONS);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages((prev) => [...prev, { text: inputValue, isUser: true }]);
      setInputValue("");
      // Simulate a response from the assistant
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "This is a simulated response.", isUser: false },
        ]);
      }, 1000);
    }
  };

  useEffect(() => {
    // Load initial suggestions or any other setup
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#0D1D1F] text-white">
      <div className="p-4 border-b border-[#C0CCAB]/20">
        <h2 className="text-xl font-semibold mb-2">RV Park Assistant</h2>
        <p className="text-sm text-[#C0CCAB]">
          Hello! I'm your RV park assistant. How can I help you today?
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.isUser ? "text-right" : "text-left"}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.isUser ? "bg-blue-500" : "bg-gray-700"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        isLoading={false}
      />
    </div>
  );
}
