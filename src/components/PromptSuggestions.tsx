import React from 'react';

const prompts = [
  'Tell me about the latest products.',
  'I need help with pricing.',
  'How can I make a purchase?',
  'Can you assist me with delivery details?',
];

const PromptSuggestions = () => {
  return (
    <div className="mt-4">
      <div className="font-semibold">Suggested Prompts:</div>
      <div className="grid grid-cols-2 gap-2">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => alert(prompt)} // Integrate with the chatbot logic
            className="p-2 border rounded-lg text-sm text-blue-500 hover:bg-gray-100"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestions;
