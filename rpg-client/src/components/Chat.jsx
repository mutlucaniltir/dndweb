import { useState, useRef, useEffect } from 'react';
import { BsChatTextFill, BsSendFill } from 'react-icons/bs';

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: 'Game AI', text: 'Welcome to the dungeon, Mutlucan. Your cat, Sütlaç, looks terrified. A rusty, flickering service robot stands before you. What do you do?' },
    { sender: 'You', text: 'I roll natural 20' },
    { sender: 'Game AI', text: 'The robot sparks violently and its head pops open, revealing a small, intricate panel. It seems your absurd luck has paid off.' },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      // Later, this will send to the backend
      console.log('Sending:', input);
      setMessages([...messages, { sender: 'You', text: input }]);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="card h-100 d-flex flex-column">
      <div className="card-header d-flex align-items-center">
        <BsChatTextFill className="me-2" />
        <h5 className="mb-0">Story Log</h5>
      </div>
      <div className="card-body flex-grow-1" style={{ overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === 'You' ? 'text-end' : 'text-start'}`}>
            <p className="mb-0">
              <strong style={{ color: msg.sender === 'You' ? '#82e0aa' : '#66d9ef' }}>
                {msg.sender}:
              </strong>
              {' '}{msg.text}
            </p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="card-footer">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="What do you do?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="btn btn-primary" type="button" onClick={handleSend}>
            <BsSendFill /> Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
