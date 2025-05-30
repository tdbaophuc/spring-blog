import { useEffect, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
  isOpen: boolean;
}

const Modal = ({ children, isOpen }: IProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up khi component unmount hoặc isOpen thay đổi
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-40 z-40 flex items-center justify-center">
      {children}
    </div>
  );
};

export default Modal;
