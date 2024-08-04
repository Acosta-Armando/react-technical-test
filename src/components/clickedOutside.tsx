import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  onClickOutside: () => void;
}

const ClickedOutside: React.FC<Props> = ({ children, onClickOutside }) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof Element && !event.target.closest('.dropdown-container')) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickOutside]);

  return (
    <div className="dropdown-container">
      {children}
    </div>
  );
};

export default ClickedOutside;