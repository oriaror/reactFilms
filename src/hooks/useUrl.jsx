// import { useEffect, useState } from "react";

// const useUrl = (title, filter, currentPage) => {
//   const [url, setUrl] = useState("");
//   useEffect(() => {
//     setUrl(
//       "http://www.omdbapi.com?" +
//         new URLSearchParams({
//           s: title,
//           apikey: "3b03ff57",
//           page: currentPage,
//           type: filter,
//         })
//     );
//   }, [title, filter, currentPage]);

//   useEffect(() => {
//     console.log(url);
//   }, [title, filter, currentPage]);

//   return [url];
// };

// export default useUrl;
