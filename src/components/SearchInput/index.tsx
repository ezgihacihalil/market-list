import style from "./style.module.css";

type SearchInputProps = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      className={style.searchInput}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchInput;
