import {FC} from "react";
import { FEHelpContent } from "../../../interfaces";
import "./HelpItemCard.css";

interface HelpItemCardProps {
  helpItem: FEHelpContent
  onClick?: () => void;
}

export const HelpItemCard: FC<HelpItemCardProps> = ({helpItem, onClick}) => {
  return (
    <div className="help-item-card" onClick={onClick}>
      <h2 className="help-item-card__title">{helpItem.title}</h2>
      <p className="help-item-card__content line-clamp-2">{helpItem.content}</p>
    </div>
  );
};
