import React from 'react';
import Todo from './Todo';
interface CopyButtonProps {
  textToCopy: string;
  onCopy: (text: string) => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, onCopy }) => {
  const copyToClipboard = () => {
    onCopy(textToCopy);
  };

  return (
    <button onClick={copyToClipboard}>Copy to Clipboard</button>
  );
};

export default CopyButton;
// This code is rensposible for  copy to clipboard