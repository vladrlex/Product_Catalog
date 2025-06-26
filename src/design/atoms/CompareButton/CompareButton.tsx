import cn from 'classnames';
import { FC } from 'react';
import BalanceSharpIcon from '@mui/icons-material/BalanceSharp';


interface CompareButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isInCompare?: boolean;
}

export const CompareButton: FC<CompareButtonProps> = ({
  isInCompare = false,
  ...rest
}) => {
  return (
    <button
      className={cn('compare')}
      {...rest}
    >
      {isInCompare 
        ? <BalanceSharpIcon sx={{color: 'var(--compare-active)'}}/> 
        : <BalanceSharpIcon sx={{color: 'var(--primary-grey-color)'}}/>}
    </button>
  );
};