import React from "react";

const PasswordStrength = ({ password }) => {
  const getStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return "Weak";
    if (strength === 2) return "Medium";
    return "Strong";
  };

  const strength = getStrength();

  const strengthColor =
    strength === "Weak"
      ? "bg-red-500"
      : strength === "Medium"
      ? "bg-yellow-500"
      : "bg-green-500";

  const textColor =
    strength === "Weak"
      ? "text-red-400"
      : strength === "Medium"
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <div className="mt-4">
      {password && (
        <>
          <p className={`text-sm mb-2 ${textColor}`}>Strength: {strength}</p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${strengthColor}`}
              style={{
                width:
                  strength === "Weak"
                    ? "33%"
                    : strength === "Medium"
                    ? "66%"
                    : "100%",
              }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default PasswordStrength;
