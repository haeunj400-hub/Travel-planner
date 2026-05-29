import { useLocation } from "react-router-dom";

function Detail() {
  const location = useLocation();

  const place = location.state?.place;

  if (!place) {
    return (
      <h1 className="p-8 text-2xl">
        데이터를 찾을 수 없습니다.
      </h1>
    );
  }

  return (
    <div className="p-8">
      <img
        src={place.firstimage}
        alt={place.title}
        className="w-full max-w-3xl rounded-xl mb-6"
      />

      <h1 className="text-4xl font-bold mb-4">
        {place.title}
      </h1>

      <p className="text-gray-600 mb-4">
        {place.addr1}
      </p>

      <p className="mb-4">
        전화번호 : {place.tel || "없음"}
      </p>

      <p className="mb-6">
        좌표 :
        {place.mapy},
        {place.mapx}
      </p>

      <a
        href={`https://map.naver.com/v5/search/${place.title}`}
        target="_blank"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        네이버 지도로 보기
      </a>
    </div>
  );
}

export default Detail;