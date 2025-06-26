import { FC } from "react"
import { P_Small } from "../../atoms/Typography/P_Small/P_Small"
import { Capitalize } from "../../../utils/helpers"

interface SpecsProps {
  specs: {[key: string]: string | string[]};
  className?: string;
}

export const Specs: FC<SpecsProps> = ({ specs, className='' }) => {
  const getSpecLabel = (key: string) => {
    if (key === 'ram') return key.toUpperCase();
    return Capitalize(key);
  };

  return (
    <div className={`specs ${className}`}>
      {Object.entries(specs).map(([key, value]) => {
        return (
          <div className="spec-item" key={key + value}>
            <P_Small className="spec-name">
              {getSpecLabel(key)}
            </P_Small>
            <P_Small className="spec-value">{Array.isArray(value) ? value.join(', ') : value}</P_Small>
          </div>
        );
      })}
    </div>
  );
};
