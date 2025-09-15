import { motion } from "framer-motion";
import { Copy, RefreshCw } from "lucide-react";
import { useState } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+[]{}|;:,.<>?";

    if (!chars) return;

    let generated = "";
    for (let i = 0; i < length; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generated);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getPasswordStrength = () => {
    let strength = 0;
    if (length >= 8) strength++;
    if (length >= 12) strength++;
    if (uppercase && lowercase && numbers && symbols) strength++;
    return strength;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900 p-4">
      <motion.div
        className="bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md text-white border border-gray-700"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Password Generator
        </h1>

        <div className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-xl p-3 mb-4">
          <span className="break-all text-lg font-medium text-blue-200">
            {password || "Your password will appear here"}
          </span>
          <button
            onClick={copyToClipboard}
            className="p-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>
        {copied && (
          <p className="text-green-400 text-sm text-right mb-3">Copied!</p>
        )}

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-blue-300">
            Password Length: {length}
          </label>
          <input
            type="range"
            min="6"
            max="30"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full cursor-pointer accent-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <label className="flex items-center gap-2 text-blue-200 font-medium">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={() => setUppercase(!uppercase)}
              className="accent-blue-500"
            />
            Uppercase
          </label>
          <label className="flex items-center gap-2 text-blue-200 font-medium">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={() => setLowercase(!lowercase)}
              className="accent-blue-500"
            />
            Lowercase
          </label>
          <label className="flex items-center gap-2 text-blue-200 font-medium">
            <input
              type="checkbox"
              checked={numbers}
              onChange={() => setNumbers(!numbers)}
              className="accent-blue-500"
            />
            Numbers
          </label>
          <label className="flex items-center gap-2 text-blue-200 font-medium">
            <input
              type="checkbox"
              checked={symbols}
              onChange={() => setSymbols(!symbols)}
              className="accent-blue-500"
            />
            Symbols
          </label>
        </div>

        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-300 mb-2">
            Password Strength:
          </p>
          <div className="flex gap-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-all ${
                  getPasswordStrength() > index
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`}
              ></div>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generatePassword}
          className="w-full py-3 bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-white font-semibold text-lg"
        >
          <RefreshCw className="w-5 h-5" />
          Generate Password
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PasswordGenerator;
