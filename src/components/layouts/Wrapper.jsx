import clsx from 'clsx';
const WRAPPER_CLASS = 'wrapper';

function Wrapper(props) {
  const customClass = clsx(WRAPPER_CLASS, props?.className);

  return <div className={customClass}>{props.children}</div>;
}

export default Wrapper;
