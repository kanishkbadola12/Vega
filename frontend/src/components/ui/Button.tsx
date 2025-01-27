import { ButtonProps } from "../../types";

const Button = ({
    label,
    onClick,
    activeCondition,
    styleClass,
    activeClass,
    inactiveClass,
    testId
  }: ButtonProps): React.ReactElement => {
    return (
      <button
        onClick={onClick}
        className={`${styleClass} ${activeCondition ? activeClass : inactiveClass}`}
        data-testid={testId}
      >
        {label}
      </button>
    );
};
  
export default Button;