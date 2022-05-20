import {useEffect, useState} from 'react';
import './pagination.css';

export interface PaginationProps {
  label: string;
  currentPage: number;
  itemsPerPage: number;
  showLabels: boolean;
  totalItems: number;
  navTo: () => void;
}


type PageProps = Omit<PaginationProps, 'label' | 'navTo' | 'showLabels'>;

type PaginationData = {
  start: number,
  end: number
}

const caculatePages = (
  pageData: PageProps
): PaginationData => {
  const {currentPage, itemsPerPage, totalItems} = pageData;
  const data: PaginationData = {start: currentPage, end: itemsPerPage};

  if (!currentPage || !totalItems) {
    data.start = 0;
    data.end = 0;
    return data;
  }

  // TODO: HANDLE CASE WITH CURRENT PAGE > NUMBER OF PAGES

  if (currentPage === 1) {
    data.start = 1;
    data.end = itemsPerPage > totalItems ? totalItems : itemsPerPage;
    return data;
  }

  if (totalItems % itemsPerPage === 0) {
    data.start = (currentPage - 1) * itemsPerPage + 1;
    data.end = itemsPerPage * currentPage;
    return data;
  }

  const startValue = (currentPage - 1) * itemsPerPage + 1;
  data.start = startValue;
  const endValue = currentPage * itemsPerPage;
  data.end = endValue > totalItems ? totalItems : endValue;

  return data;
};

const PageButtons = (pageData: PageProps): JSX.Element => {
  // buttons to render
  const numPages = Math.ceil(pageData.totalItems / pageData.itemsPerPage);

  let buttons = new Array(3).fill(null);

  console.log('buttons: ' , buttons);
  buttons = buttons.map((v, i) => i + 1).map(el => (
    <button className='pagination--button' key={`page-button-${el}`}>{el}</button>
  ));
  
  return (
    <>
    {buttons}
    </>
  );
};

export const Pagination = ({
  label = 'Projects',
  currentPage = 1,
  itemsPerPage = 5,
  showLabels = true,
  totalItems = 15
}: PaginationProps) => {

  const [start, setStart] = useState(currentPage);
  const [end, setEnd] = useState(itemsPerPage);

  useEffect(() => {
    const pageData = caculatePages({currentPage, itemsPerPage, totalItems});
    setStart(pageData.start);
    setEnd(pageData.end);
  }, [currentPage, totalItems]);

  return (
    <div className='pagination--container'>
      {showLabels && (<div className='pagination--control-container'>
        <span>Showing {start} - {end}  of {totalItems} {label}</span>
      </div>)}
      <div className='pagination--control-container'>
        <button className='pagination--button'>Prev</button>
        <PageButtons currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} />
        <button className='pagination--button'>Next</button>
      </div>
    </div>
  );
};
