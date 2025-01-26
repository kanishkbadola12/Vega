import { ButtonProps } from "../../types";

const Button = ({
    label,
    onClick,
    activeCondition,
    styleClass,
    activeClass,
    inactiveClass,
  }: ButtonProps) => {
    return (
      <button
        onClick={onClick}
        className={`${styleClass} ${activeCondition ? activeClass : inactiveClass}`}
      >
        {label}
      </button>
    );
};
  
export default Button;