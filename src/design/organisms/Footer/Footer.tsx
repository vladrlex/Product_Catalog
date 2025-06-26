import { Logo } from '../../atoms/Logo/Logo';
import { P_UpperCase } from '../../atoms/Typography/P_UpperCase/P_UpperCase';
import { BackToTop } from '../../molecules/BackToTop/BackToTop';
import { GridTemplate } from '../../templates/GridTemplate';

export const Footer = () => {
  return (
    <div className="footer">
      <GridTemplate>
        <div className="footer__inner-container">
          <Logo linkClass="footer__logo-link" imgClass="footer__logo-image" />

          <div className="footer__links">
            <a
              href="https://github.com/FSJAN25-team2/Product_catalog_Galera_team"
              rel="noreferrer"
              className="footer__link"
            >
              <P_UpperCase>github</P_UpperCase>
            </a>
            <a href="#" rel="noreferrer" className="footer__link">
              <P_UpperCase>contacts</P_UpperCase>
            </a>
            <a href="#" rel="noreferrer" className="footer__link">
              <P_UpperCase>rights</P_UpperCase>
            </a>
          </div>

          <BackToTop />
        </div>
      </GridTemplate>
    </div>
  );
};
