interface Props {
  tabId: string;
  current: string;
  option: string;
  category: string;
}

export const useCalculateNewLink = () => {
  const calculateNewLink = ({ tabId, current, option, category }: Props) => {
    const normalizedOption = option.toLowerCase().split(' ').join('-');
    const normalizedCurrent = current.toLowerCase().split(' ').join('-');
    const newTabId = tabId.replace(normalizedCurrent, normalizedOption);

    return `/${category}/${newTabId}`;
  }

  return { calculateNewLink };
}