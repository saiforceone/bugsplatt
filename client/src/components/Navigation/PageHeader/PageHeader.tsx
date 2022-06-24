import React, { FC } from "react";
import './PageHeader.css';

export interface PageHeaderProps {
  backActionElement?: React.ReactNode;
  title: string;
  subtitle?: string;
  rightActions?: React.ReactNode;
}

export const PageHeader: FC<PageHeaderProps> = ({
  backActionElement,
  title,
  subtitle,
  rightActions
}) => {
  return (
    <div className="page-header">
      {backActionElement && (<div className="page-header--back-action">{backActionElement}</div>)}
      <div className="page-header--content">
        <h1 className="page-header--title">{title}</h1>
        {subtitle && (<p className="page-header--subtitle">{subtitle}</p>)}
      </div>
      {rightActions && (<div className="page-header--actions">{rightActions}</div>)}
    </div>
  )
}
