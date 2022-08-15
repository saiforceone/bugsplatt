import React, { FC } from "react";
import './SectionHeader.css';

interface SectionHeaderProps {
  titleElementExtra?: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  titleElementExtra,
  subtitle,
  actions
}) => {
  return (
    <div className="section-header">
      <div className="section-header--content">
        <div className="default-row">
          <h2 className="section-header--title">{title}</h2>
          {titleElementExtra}
        </div>
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
