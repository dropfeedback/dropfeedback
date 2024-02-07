import React, { useEffect, useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import { useColorMode, type ColorMode } from "@docusaurus/theme-common";
import { Widget } from "../Widget";
import { ColorPicker } from "./ColorPicker";
import {
  lightBgPresetColors,
  darkBgPresetColors,
  darkTextPresetColors,
  lightTextPresetColors,
  defaultPresetColors,
} from "./constants/presets";

import styles from "./styles.module.css";

export const WidgetCustomization = () => {
  const { colorMode, setColorMode } = useColorMode();
  const [primaryColor, setPrimaryColor] = useState<string>(
    defaultPresetColors[0],
  );
  const [backgroundColor, setBackgroundColor] = useState<string>(
    colorMode === "dark" ? darkBgPresetColors[0] : lightBgPresetColors[0],
  );
  const [textColor, setTextColor] = useState<string>(
    colorMode === "dark" ? darkTextPresetColors[0] : lightTextPresetColors[0],
  );

  useEffect(() => {
    setBackgroundColor(
      colorMode === "dark" ? darkBgPresetColors[0] : lightBgPresetColors[0],
    );
    setTextColor(
      colorMode === "dark" ? darkTextPresetColors[0] : lightTextPresetColors[0],
    );
  }, [colorMode]);

  const jsCode = `
<script src="https://unpkg.com/@dropfeedback/core" type="module" defer />

<drop-feedback 
  theme-scheme="${colorMode}" 
  theme-primary-color="${primaryColor}"
  theme-background-color="${backgroundColor}"
  theme-text-color="${textColor}" 
/>

<button data-feedback-button>Feedback</button>
  `.trim();

  const reactCode = `
import { DropFeedback } from "@dropfeedback/react";

export const App = () => (
  <>
    <DropFeedback
      theme={{
        scheme: "${colorMode}",
        primaryColor: "${primaryColor}",
        backgroundColor: "${backgroundColor}",
        textColor: "${textColor}",
      }}
    />
    <button data-feedback-button>Feedback</button>
  </>
);  
  `.trim();

  return (
    <div className={styles.container}>
      <div className={styles.playground}>
        <div className={styles.widget}>
          <Widget
            scheme={colorMode}
            sideOffset={0}
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
            textColor={textColor}
          />
        </div>
        <div className={styles.editor}>
          <div className={styles.formItem}>
            <label htmlFor="scheme">Scheme</label>
            <select
              id="scheme"
              value={colorMode}
              onChange={(e) => {
                setColorMode(e.target.value as ColorMode);
              }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className={styles.formItem}>
            <label htmlFor="primaryColor">Primary Color</label>
            <ColorPicker
              value={primaryColor}
              onChange={(value) => setPrimaryColor(value)}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="backgroundColor">Background Color</label>
            <ColorPicker
              presetColors={
                colorMode === "dark" ? darkBgPresetColors : lightBgPresetColors
              }
              value={backgroundColor}
              onChange={(value) => setBackgroundColor(value)}
              invertCheckmark={colorMode === "light"}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="textColor">Text Color</label>
            <ColorPicker
              presetColors={
                colorMode === "dark"
                  ? darkTextPresetColors
                  : lightTextPresetColors
              }
              value={textColor}
              onChange={(value) => setTextColor(value)}
              invertCheckmark={colorMode === "dark"}
            />
          </div>
        </div>
      </div>
      <div className={styles.codeTabs}>
        <Tabs groupId="frameworks">
          <TabItem value="js" label="JavaScript">
            <CodeBlock className={styles.codeBlock} language="html">
              {jsCode}
            </CodeBlock>
          </TabItem>
          <TabItem value="react" label="React">
            <CodeBlock className={styles.codeBlock} language="tsx">
              {reactCode}
            </CodeBlock>
          </TabItem>
        </Tabs>
      </div>
    </div>
  );
};
