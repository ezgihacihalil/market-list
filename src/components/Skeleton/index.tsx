import style from "./style.module.css";

const Skeleton = () => {
  return (
    <div className={style.skeleton}>
      <div className={style.skeletonContainer}>
        <div className={style.skeletonRounded}></div>
      </div>
      <div className={style.skeletonInner}></div>
      <div className={style.skeletonInner}></div>
      <div className={style.skeletonInner}></div>
    </div>
  );
};

const SkeletonList = ({ count = 10 }) => {
  return (
    <div data-testid="loading">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  );
};

export default SkeletonList;
