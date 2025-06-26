import { P_Small } from "../../atoms/Typography/P_Small/P_Small";

export const BackToTop = () => {
  const handleScrollToTop = () => {
    const scrollableElement = document.querySelector('.simplebar-content-wrapper');
    if (scrollableElement) {
      scrollableElement.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className='footer__back-to-top' onClick={handleScrollToTop}>
      <P_Small>Back to top</P_Small>
      <img 
        src="/icons/arrow-up.svg" 
        alt="Back to top"
        className="footer__back-to-top--icon"
      />
    </div>
  );
}; 