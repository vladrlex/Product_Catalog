import { Skeleton, Stack } from '@mui/material'
import { FC } from 'react';
interface SkeletonCardsProps {
  quantity: number;
}

export const SkeletonCards:FC<SkeletonCardsProps> = ({ quantity }) => {
  return (
    Array.from({ length: +quantity }).map((_, i) => (
      <div className="product-card" key={`placeholder-${i}`}>
        <Stack spacing={1} alignItems={'center'} bgcolor={'var(--surface-card)'}>
          <Skeleton variant='rectangular' height={275} width={200} sx={{backgroundColor: "var(--checkout)"}}/>
          <Skeleton variant='rectangular' height={40} width={'100%'} sx={{backgroundColor: "var(--checkout)"}}/>
          <Skeleton variant='rectangular' height={40} width={'50%'} sx={{alignSelf: 'flex-start', backgroundColor: "var(--checkout)"}}/>
          <Skeleton variant='text' width={'100%'} sx={{backgroundColor: "var(--checkout)"}}/>
          <Skeleton variant='text' width={'100%'} sx={{backgroundColor: "var(--checkout)"}}/>
          <Skeleton variant='text' width={'100%'} sx={{backgroundColor: "var(--checkout)"}}/>
          <Skeleton variant='rectangular' height={40} width={'100%'} sx={{backgroundColor: "var(--checkout)"}}/>
        </Stack>
      </div>
    ))
  );
};
