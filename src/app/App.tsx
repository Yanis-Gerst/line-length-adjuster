import { useEffect, useState } from "react";
import { Text } from "@penpot/plugin-types";
import LineLength from "./LineLength";
import { PluginMessageEvent } from "../model";

function App() {
  const url = new URL(window.location.href);
  const initialTheme = url.searchParams.get("theme");

  const [theme, setTheme] = useState(initialTheme || null);
  const [selectedText, setSelectedText] = useState<Text | null>(null);

  useEffect(() => {
    const handleMessage = (event: { data: PluginMessageEvent<unknown> }) => {
      const { type, content } = event.data;

      switch (type) {
        case "THEME_CHANGE":
          setTheme(content as string);
          break;
        case "SELECTION_UPDATE":
          setSelectedText(content as Text);
          break;
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div data-theme={theme} className="my-4 text-slate-800 text-sm">
      <LineLength selectedText={selectedText} />
    </div>
  );
}

export default App;
