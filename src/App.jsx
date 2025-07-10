import { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";

const generateHoverColor = (id) => {
  const colors = [
    "#D32F2F", "#C2185B", "#7B1FA2", "#1976D2", "#00796B",
    "#388E3C", "#F57C00", "#E64A19", "#5D4037", "#455A64",
  ];
  return colors[id % colors.length];
};

const App = () => {
  const [azkar, setAzkar] = useState([]);
  const [counts, setCounts] = useState({});
  const [hoverColors, setHoverColors] = useState({});
  const [colors, setColors] = useState({});

  useEffect(() => {
    fetch("/azkar.txt")
      .then((res) => res.text())
      .then((text) => {
        // نستخرج cards من الـ JSON
        const json = JSON.parse(text);
        const data = json.cards;  

        setAzkar(data);

        const initialCounts = {};
        const initialColors = {};
        const initialHoverColors = {};

        data.forEach((item) => {
          initialCounts[item.id] = item.count;
          initialColors[item.id] = item.backgroundColor;
          initialHoverColors[item.id] = generateHoverColor(item.id);
        });

        setCounts(initialCounts);
        setColors(initialColors);
        setHoverColors(initialHoverColors);
      })
      .catch((err) => console.error("Error loading azkar.txt:", err));
  }, []);

  const handleDecrement = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max(prev[id] - 1, 0),
    }));
  };

  const handleReset = (e, id, originalCount) => {
    e.stopPropagation();
    setCounts((prev) => ({
      ...prev,
      [id]: originalCount,
    }));
  };

  const handleMouseOver = (id) => {
    setColors((prev) => ({
      ...prev,
      [id]: hoverColors[id],
    }));
  };

  const handleMouseOut = (id, originalColor) => {
    setColors((prev) => ({
      ...prev,
      [id]: originalColor,
    }));
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-bold p-6">أذكار المسلم</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {azkar.map((item) => (
          <div
            key={item.id}
            onClick={() => handleDecrement(item.id)}
            onMouseOver={() => handleMouseOver(item.id)}
            onMouseOut={() => handleMouseOut(item.id, item.backgroundColor)}
            style={{
              backgroundColor: colors[item.id],
              color: "white",
              width: "220px",
              height: "220px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              cursor: "pointer",
              transition: "0.3s ease-in-out",
              fontWeight: "bold",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "10px" }}>
              {item.title}
            </div>
            <div style={{ fontSize: "2rem" }}>{counts[item.id]}</div>
            <div style={{ fontSize: "2rem", opacity: 0.8 }}>{item.count}</div>
            <div
              onClick={(e) => handleReset(e, item.id, item.count)}
              style={{ fontSize: "1.5rem", marginTop: "10px" }}
            >
              <i className="fa fa-refresh"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

