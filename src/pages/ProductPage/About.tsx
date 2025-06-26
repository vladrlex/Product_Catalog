import { H3 } from '../../design/atoms/Typography/H3/H3';
import { H4 } from '../../design/atoms/Typography/H4/H4';
import { P } from '../../design/atoms/Typography/P/P';

interface Props {
  description: { title: string; text: string[] }[];
}

export const About: React.FC<Props> = ({ description }) => {
  return (
    <div className="about section">
      <H3 className="section__title">About</H3>

      {description.map(item => {
        const { title, text } = item;
        return (
          <div key={title}>
            <H4 className="about__title">{title}</H4>
            {text.map((par, index) => {
              return (
                <div key={par.slice(2, 6)}>
                  <P className="about__text">{par}</P>
                  {index === text.length - 1 ? '' : <br />}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
