import { SortConfig } from "../../hooks/useSort";
import style from "./style.module.css";

type TableHeaderProps<T> = {
  columnTitles: Record<string, string>;
  handleSort: (field: T) => void;
  sortConfig: SortConfig;
};

type ArrowProps = {
  active: boolean;
  direction: "asc" | "desc";
};

const Arrow = ({ active, direction }: ArrowProps) => (
  <svg
    className={direction === "asc" ? style.ascArrow : ""}
    fill={active ? "#0251ff" : "#e1ecf8"}
    height="12px"
    width="12px"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 386.257 386.257"
  >
    <polygon points="0,96.879 193.129,289.379 386.257,96.879 " />
  </svg>
);

const TableHeader = <T,>({
  columnTitles,
  handleSort,
  sortConfig,
}: TableHeaderProps<T>) => {
  const { key, direction } = sortConfig;

  return (
    <div className={style.titleContainer}>
      {Object.entries(columnTitles).map(([field, title]) => (
        <div
          key={field}
          className={style.title}
          onClick={() => handleSort(field as T)}
        >
          <p>{title}</p>
          <div className={style.arrowContainer}>
            <Arrow
              active={key === field && direction === "asc"}
              direction={"asc"}
            />
            <Arrow
              active={key === field && direction === "desc"}
              direction={"desc"}
            />
          </div>
        </div>
      ))}
      <p className={style.title} />
    </div>
  );
};

export default TableHeader;
