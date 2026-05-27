import { Link } from "react-router-dom";
import { useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved =
      localStorage.getItem("favorites");

    return saved ? JSON.parse(saved) : [];
  });

  const removeFavorite = (id) => {
    const updated = favorites.filter(
      (item) => item.contentid !== id
    );

    setFavorites(updated);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">
        ❤️ 찜 목록
      </h1>

      {favorites.length === 0 && (
        <h2>찜한 관광지가 없습니다.</h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {favorites.map((place) => (
          <div
            key={place.contentid}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <Link
              to={`/detail/${place.contentid}`}
              state={{ place }}
            >
              <img
                src={place.firstimage}
                alt={place.title}
                className="w-full h-60 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">
                  {place.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {place.addr1}
                </p>
              </div>
            </Link>

            <div className="px-4 pb-4">
              <button
                onClick={() =>
                  removeFavorite(
                    place.contentid
                  )
                }
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                삭제하기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;