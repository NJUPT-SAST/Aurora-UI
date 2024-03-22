import React, { useEffect, useState, type ReactNode } from 'react';
import styles from './Pagination.module.scss';
import classNames from 'classnames';
import { PaginationItem } from './PaginationItem';
import { useCurrentPageStore } from './useCurrentPageStore';

export interface PaginationProps {
  /**
   * the total of the number 一共的总条数
   */
  total: number;
  /**
   * the pageSize of the total 每页条数
   */
  pageSize: number;
  /**
   * the onchange of the Pagination
   */
  onChange?: (value: number) => void;
  /**
   * currentpage of the Pagination
   */
  activePage?: number | undefined;
  /**
   * defaultActivePage of the Pagination
   */
  defaultActivePage?: number;
  /**
   * disabled of the Pagination
   */
  disabled?: boolean;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      pageSize = 10,
      total = 60,
      onChange = function () {},
      activePage,
      defaultActivePage = 1,
      disabled = false,
      ...rest
    },
    ref,
  ) => {
    const [itemList, setItemList] = useState<ReactNode[]>();
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [currentPage, changeCurrentPage] = useCurrentPageStore((state) => [
      state.currentPage,
      state.changeCurrentPage,
    ]);

    //default value must be assigned initially, and cannot be assigned later.
    useEffect(() => {
      changeCurrentPage(defaultActivePage);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const pageNumber = total / pageSize;
      //Returns the smallest integer greater than or equal to its numeric argument.
      setPageNumber(Math.ceil(pageNumber));
    }, [total, pageSize]);

    useEffect(() => {
      onChange(currentPage);
    }, [currentPage, onChange]);

    useEffect(() => {
      if (activePage) changeCurrentPage(activePage);
    }, [activePage, changeCurrentPage]);

    useEffect(() => {
      const newItems: ReactNode[] = [];
      //When the number of pages is less than or equal to 7, all are displayed without ellipses in between
      if (pageNumber <= 7)
        for (let i = 0; i < pageNumber; i++) {
          newItems.push(
            <PaginationItem
              type="select"
              key={i}
              index={i}
              disabled={disabled}
            >
              {i + 1}
            </PaginationItem>,
          );
        }
      else {
        // This is the omission of currentPage when there are too many numbers and the currentPage appears in the first Four.
        if (currentPage <= 3) {
          for (let i = 0; i < 4; i++) {
            newItems.push(
              <PaginationItem
                type="select"
                index={i}
                disabled={disabled}
              >
                {i + 1}
              </PaginationItem>,
            );
          }
          newItems.push(
            <PaginationItem type="none">
              <span>...</span>
            </PaginationItem>,
          );
          for (let i = pageNumber - 3; i < pageNumber; i++) {
            newItems.push(
              <PaginationItem
                type="select"
                index={i}
                disabled={disabled}
              >
                {i + 1}
              </PaginationItem>,
            );
          }
        }
        // This is the case when currentPage is omitted in the last four occurrences.
        if (currentPage >= pageNumber - 2) {
          for (let i = 0; i < 3; i++) {
            newItems.push(
              <PaginationItem
                type="select"
                index={i}
                disabled={disabled}
              >
                {i + 1}
              </PaginationItem>,
            );
          }
          newItems.push(
            <PaginationItem type="none">
              <span>...</span>
            </PaginationItem>,
          );
          for (let i = pageNumber - 4; i < pageNumber; i++) {
            newItems.push(
              <PaginationItem
                type="select"
                index={i}
                disabled={disabled}
              >
                {i + 1}
              </PaginationItem>,
            );
          }
        }
        //This is what happens when currentPage appears in the middle of the omission
        if (currentPage < pageNumber - 2 && currentPage > 3) {
          newItems.push(
            <PaginationItem
              type="select"
              index={0}
              disabled={disabled}
            >
              {1}
            </PaginationItem>,
          );
          newItems.push(
            <PaginationItem type="none">
              <span>...</span>
            </PaginationItem>,
          );
          for (let i = currentPage - 2; i < currentPage + 2; i++) {
            newItems.push(
              <PaginationItem
                type="select"
                index={i}
                disabled={disabled}
              >
                {i + 1}
              </PaginationItem>,
            );
          }
          newItems.push(
            <PaginationItem type="none">
              <span>...</span>
            </PaginationItem>,
          );
          newItems.push(
            <PaginationItem
              type="select"
              index={pageNumber - 1}
              disabled={disabled}
            >
              {pageNumber}
            </PaginationItem>,
          );
        }
      }
      setItemList(newItems);
    }, [pageNumber, currentPage, disabled]);

    const PaginationClass = classNames(`${styles['base']} ${styles[disabled ? 'disabled' : '']}`);

    return (
      <>
        <div
          ref={ref}
          {...rest}
          className={PaginationClass}
        >
          <PaginationItem
            type="delete"
            disabled={currentPage === 1 || disabled}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.7267 12L12.6667 11.06L9.61341 8L12.6667 4.94L11.7267 4L7.72675 8L11.7267 12Z" />
              <path d="M7.33344 12L8.27344 11.06L5.2201 8L8.27344 4.94L7.33344 4L3.33344 8L7.33344 12Z" />
            </svg>
          </PaginationItem>
          {itemList}
          <PaginationItem
            type="add"
            disabled={currentPage === pageNumber || disabled}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.27325 4L3.33325 4.94L6.38659 8L3.33325 11.06L4.27325 12L8.27325 8L4.27325 4Z" />
              <path d="M8.66656 4L7.72656 4.94L10.7799 8L7.72656 11.06L8.66656 12L12.6666 8L8.66656 4Z" />
            </svg>
          </PaginationItem>
        </div>
      </>
    );
  },
);

Pagination.displayName = 'Pagination';
