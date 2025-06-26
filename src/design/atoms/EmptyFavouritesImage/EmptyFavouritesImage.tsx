import './EmptyFavouritesImage.scss';

export const EmptyFavouritesImage = () => {
  return (
    <div className="empty-favourites-image">
      <div className="empty-favourites-image__container">
        <img 
          src="/img/empty-favourites.png" 
          alt="Empty favourites"
          className="empty-favourites-image__img"
        />
      </div>
      <p className="empty-favourites-image__text">
        Your favourites list is empty
      </p>
    </div>
  );
}; 