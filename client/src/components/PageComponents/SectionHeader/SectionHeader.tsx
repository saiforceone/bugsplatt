import { FC } from "react";
import './SectionHeader.css';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actions
}) => {
  return (
    <div className="section-header">
      <div className="section-header--content">
        <h2 className="section-header--title">{title}</h2>
        {subtitle && (<p className="section-header--subtitle">{subtitle}</p>)}
      </div>
      {actions && (
        <div className="section-header--actions">
          {actions}
        </div>
      )}
    </div>
  )
}
