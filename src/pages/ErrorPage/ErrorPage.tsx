import { ButtonBack } from '../../design/atoms/ButtonBack/ButtonBack';
import { P } from '../../design/atoms/Typography/P/P';
import { P_UpperCase } from '../../design/atoms/Typography/P_UpperCase/P_UpperCase';
import { useCountdown } from '../../utils/hooks/useCountdown';

export const ErrorPage = () => {
  const countdown = useCountdown(5);

  return (
    <>
      <ButtonBack className='error__button-back' />

      <div className="error">
        <img
          src="error-page.svg"
          alt="Oops.. Error!"
          className="error__picture"
        />

        <P_UpperCase className="error__title">
          Oops, something went wrong.. Please try again later
        </P_UpperCase>
      <P className="error__title">Redirect in {countdown}</P>
      </div>
    </>
  );
};
