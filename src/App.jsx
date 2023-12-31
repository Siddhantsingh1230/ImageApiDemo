import { useState } from "react";
import { useEffect } from "react";

const Card = ({ styleClass, url }) => {
  let styles = {
    borderRadius: "1rem",
    margin: "0.5rem",
    backgroundImage: `url(${url})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <>
      <div style={styles} className={styleClass}></div>
    </>
  );
};

const App = () => {
  const [imageData, setImageData] = useState([]);
  const classNames = ["small", "medium", "big"];
  const fetchData = () => {
    try {
      fetch(process.env.REACT_APP_API_KEY)
        .then((response) => response.json())
        .then((data) => {
          setImageData(data.hits);
        });
    } catch (e) {
      console.log("Can't fetch images at this moment");
    }
  };
  const randomSizeGeneartor = () => {
    return classNames[Math.floor(Math.random() * 3)];
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="container">
        {imageData.length > 0
          ? imageData.map((item, idx) => {
              return (
                <Card
                  key={idx}
                  url={item.largeImageURL}
                  styleClass={randomSizeGeneartor()}
                />
              );
            })
          : <div className="empty">No images 😢</div>
          }
          
      </div>
    </>
  );
};

export default App;
