import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [places, setPlaces] = useState([]);
  const [areaCode, setAreaCode] = useState(1);
  const [search, setSearch] = useState("");

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");

    return saved ? JSON.parse(saved) : [];
  });

  const areas = [
    { name: "서울", code: 1 },
    { name: "인천", code: 2 },
    { name: "대전", code: 3 },
    { name: "대구", code: 4 },
    { name: "광주", code: 5 },
    { name: "부산", code: 6 },
    { name: "울산", code: 7 },
    { name: "세종", code: 8 },
    { name: "경기", code: 31 },
    { name: "강원", code: 32 },
    { name: "충북", code: 33 },
    { name: "충남", code: 34 },
    { name: "경북", code: 35 },
    { name: "경남", code: 36 },
    { name: "전북", code: 37 },
    { name: "전남", code: 38 },
    { name: "제주", code: 39 },
  ];

  const getPlaces = async (code) => {
    try {
      const res = await axios.get(
        `https://travel-planner-srh3.onrender.com/tour?areaCode=${code}`
      );

      setPlaces(res.data.response.body.items.item);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlaces(areaCode);
  }, [areaCode]);

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const toggleFavorite = (place) => {
    const exists = favorites.find(
      (item) => item.contentid === place.contentid
    );

    if (exists) {
      setFavorites(
        favorites.filter(
          (item) => item.contentid !== place.contentid
        )
      );
    } else {
      setFavorites([...favorites, place]);
    }
  };

  const isFavorite = (id) => {
    return favorites.some(
      (item) => item.contentid === id
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">
        국내 여행 플래너
      </h1>

      <div className="flex gap-4 items-center mb-6 flex-wrap">
        <select
          className="border p-2 rounded"
          value={areaCode}
          onChange={(e) =>
            setAreaCode(e.target.value)
          }
        >
          {areas.map((area) => (
            <option
              key={area.code}
              value={area.code}
            >
              {area.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="관광지 검색"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-2 rounded"
        />

        <h2 className="font-semibold">
          ❤️ 찜 개수 : {favorites.length}
        </h2>

        <Link
          to="/favorites"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          찜 목록 보기
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {places
          .filter((place) =>
            place.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          )
          .map((place) => (
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
                    toggleFavorite(place)
                  }
                  className="bg-pink-500 text-white px-4 py-2 rounded"
                >
                  {isFavorite(place.contentid)
                    ? "❤️ 찜됨"
                    : "🤍 찜하기"}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;