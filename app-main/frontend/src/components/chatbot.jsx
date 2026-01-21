import { useState, useRef, useEffect } from "react";
import "./chatbot.css"; // Changed case to match your file

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm Veritas AI. I can help you verify news and identify misinformation. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Check if we have the API key
      const apiKey = process.env.REACT_APP_GROQ_API_KEY;
      if (!apiKey) {
        throw new Error("API key not found. Please set REACT_APP_GROQ_API_KEY in your .env file");
      }

      // Dynamic import for groq-sdk to handle any installation issues
      const { default: Groq } = await import('groq-sdk');
      
      const groq = new Groq({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are Veritas AI, a factual news verification assistant. Your purpose is to help users identify misinformation and verify news claims. Be concise, factual, and provide evidence-based responses. When unsure, admit uncertainty. Always cite sources when possible. Specialize in detecting fake news patterns, deepfakes, and manipulated media."
          },
          ...messages.map(msg => ({ role: msg.role, content: msg.content })),
          userMessage
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 500,
        stream: false,
      });

      const aiMessage = {
        role: "assistant",
        content: chatCompletion.choices[0]?.message?.content || "I apologize, but I couldn't process your request."
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: error.message.includes("API key") 
          ? "API configuration error. Please set up your Groq API key."
          : "Sorry, I'm having trouble connecting. Please try again later."
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button 
        className={`chatbot-button ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
      >
        {open ? '✕' : '💬'}
        {!open && messages.length > 1 && (
          <span className="notification-badge">{messages.length - 1}</span>
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="header-content">
              <div className="avatar">V</div>
              <div className="header-text">
                <h3>Veritas AI</h3>
                <p>News Verification Assistant</p>
              </div>
            </div>
            <button className="close-btn" onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Messages Container */}
          <div className="messages-container">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.role}`}
              >
                <div className="message-bubble">
                  <div className="message-sender">
                    {message.role === 'assistant' ? 'Veritas AI' : 'You'}
                  </div>
                  <div className="message-content">
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="message assistant">
                <div className="message-bubble">
                  <div className="message-sender">Veritas AI</div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form className="input-area" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about news verification..."
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  handleSubmit(e);
                }
              }}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || loading}
              className="send-btn"
            >
              {loading ? (
                <div className="spinner"></div>
              ) : (
                '↑'
              )}
            </button>
          </form>

          {/* Quick Suggestions */}
          <div className="quick-suggestions">
            <p>Quick questions:</p>
            <div className="suggestion-buttons">
              {[
                "How to spot fake news?",
                "How can I verify a news article?",
                "What are signs of misinformation?",
                "Check a fact for me"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  className="suggestion-btn"
                  onClick={() => setInput(suggestion)}
                  disabled={loading}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}