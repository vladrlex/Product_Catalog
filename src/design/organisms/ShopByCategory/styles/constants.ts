export const IMAGE_DEFAULT_STYLES = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
} as const;

export const CARD_DEFAULT_STYLES = {
  backgroundColor: '#6A4DBA',
  opacity: 0.9,
} as const;

export const IMAGE_SIZE = {
  width: '200%',
  height: '200%',
} as const;

export const CATEGORY_POSITIONS = {
  phones: {
    right: '-60%',
    bottom: '-90%',
  },
  tablets: {
    right: '-75%',
    bottom: '-97%',
  },
  accessories: {
    right: '-110%',
    bottom: '-70%',
  },
} as const;

export const CATEGORY_COLORS = {
  phones: '#fcdec4',
  tablets: '#8D8D92',
  accessories: '#973D5F',
} as const; 