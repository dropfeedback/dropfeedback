import { useEffect, useState } from "react";
import { DropFeedback } from "@dropfeedback/react";

function App() {
  const [scheme, setScheme] = useState<"light" | "dark">("light");
  const [position, setPosition] = useState<"right" | "left">("right");
  const [primaryColor, setPrimaryColor] = useState("#1677ff");
  const [textColor, setTextColor] = useState("#171717");
  const [backgroundColor, setBackgroundColor] = useState("#fafafa");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", scheme === "dark");

    if (scheme === "light") {
      setTextColor("#171717");
      setBackgroundColor("#fafafa");
    } else {
      setTextColor("#ededed");
      setBackgroundColor("#000000");
    }
  }, [scheme]);

  const onSchemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScheme(e.target.value as "light" | "dark");
  };

  const onPositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value as "right" | "left");
  };

  return (
    <main>
      <fieldset>
        <legend>Theme:</legend>

        <div>
          <input
            type="radio"
            id="light"
            name="theme"
            value="light"
            checked={scheme === "light"}
            onChange={onSchemeChange}
          />
          <label htmlFor="light">Light</label>

          <input
            type="radio"
            id="dark"
            name="theme"
            value="dark"
            checked={scheme === "dark"}
            onChange={onSchemeChange}
          />
          <label htmlFor="dark">Dark</label>
        </div>

        <div>
          <div>
            <input
              type="color"
              id="primaryColor"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
            />
            <label htmlFor="primaryColor">Primary Color</label>
          </div>

          <div>
            <input
              type="color"
              id="backgroundColor"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
            <label htmlFor="backgroundColor">Background Color</label>

            <input
              type="color"
              id="textColor"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
            <label htmlFor="textColor">Text Color</label>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Positon:</legend>

        <div>
          <input
            type="radio"
            id="right"
            name="position"
            value="right"
            checked={position === "right"}
            onChange={onPositionChange}
          />
          <label htmlFor="right">Right</label>

          <input
            type="radio"
            id="left"
            name="position"
            value="left"
            checked={position === "left"}
            onChange={onPositionChange}
          />
          <label htmlFor="left">Left</label>
        </div>
      </fieldset>

      <DropFeedback
        projectId="24320d3d-c5f2-44e1-83a1-13e1cb61fe1d"
        theme={{
          scheme,
          primaryColor,
          textColor,
          backgroundColor,
        }}
        meta={{
          "customer-id": "123",
          role: "admin",
        }}
      />
    </main>
  );
}

export default App;
