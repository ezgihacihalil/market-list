import React from "react";
import { calculateChangeAndClass } from "../../utils/change";
import { Ticker24hUpdate } from "../MarketList/types";

import style from "./style.module.css";

interface ChangeDisplayProps {
  data: Ticker24hUpdate;
}

const ChangeDisplay: React.FC<ChangeDisplayProps> = ({ data }) => {
  const { change, changeClass } = calculateChangeAndClass(data);

  return <div className={style[changeClass]}>{change}</div>;
};

export default ChangeDisplay;
