import React, { FC, memo } from "react";
import Icons from "../../assets/market-icons.svg";

interface Props extends React.SVGAttributes<SVGElement> {
  name: string;
}

const IconComponent: FC<Props> = memo(({ name, ...props }) => {
  return (
    <svg {...props}>
      <use href={`${Icons}#${name}`} />
    </svg>
  );
});

export default IconComponent;
