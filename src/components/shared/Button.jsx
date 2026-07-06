// import { motion } from 'framer-motion';

// const Button = ({ children, variant = 'primary', className = '', ...props }) => {
//   const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     primary: "bg-primary hover:bg-primary-hover text-white focus:ring-primary shadow-lg shadow-primary/20",
//     secondary: "bg-secondary hover:bg-secondary-hover text-white focus:ring-secondary shadow-lg shadow-secondary/20",
//     outline: "border-2 border-border hover:border-primary hover:text-primary text-dark bg-transparent focus:ring-dark",
//     ghost: "text-dark hover:bg-surface focus:ring-dark"
//   };

//   return (
//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       className={`${baseStyles} ${variants[variant]} ${className}`}
//       {...props}
//     >
//       {children}
//     </motion.button>
//   );
// };

// export default Button;

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = "inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transform";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20",
    secondary: "bg-secondary text-white hover:bg-secondary-hover shadow-lg shadow-secondary/20",
    outline: "border-2 border-border text-dark hover:border-primary hover:text-primary",
    ghost: "text-dark hover:bg-surface",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
export default Button;