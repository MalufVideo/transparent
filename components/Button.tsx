import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  loading = false, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  let variantStyles = "";
  if (variant === 'primary') {
    variantStyles = "px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium border border-white/20 shadow-lg backdrop-blur-sm";
  } else if (variant === 'secondary') {
    variantStyles = "px-4 py-1 rounded-full bg-black/20 hover:bg-black/30 text-white/80 text-sm border border-white/10";
  } else if (variant === 'icon') {
    variantStyles = "p-2 rounded-full hover:bg-white/10 text-white/80 transition-colors";
  }

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className}`} 
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Thinking...
        </span>
      ) : children}
    </button>
  );
};