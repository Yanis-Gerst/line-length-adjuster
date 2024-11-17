import { Shape, Text } from "@penpot/plugin-types";
import {
  type ResizeTextPluginEvent,
  type SelectionPluginEvent,
  type ThemePluginEvent,
} from "./model";

penpot.ui.open("Line Length Adjuster", `?theme=${penpot.theme}`);

penpot.on("themechange", (theme) => {
  sendMessage<ThemePluginEvent>({
    type: "THEME_CHANGE",
    content: theme,
  });
});

penpot.on("selectionchange", () => {
  const currentSelection = penpot.selection[0];
  let content: Shape | null = currentSelection;
  if (
    penpot.selection.length > 1 ||
    !currentSelection ||
    currentSelection.type !== "text"
  ) {
    content = null;
  }
  sendMessage<SelectionPluginEvent>({
    type: "SELECTION_UPDATE",
    content: content as Text | null,
  });
});

const sendMessage = <T>(message: T) => {
  penpot.ui.sendMessage(message);
};

penpot.ui.onMessage<ResizeTextPluginEvent>((message) => {
  if (message.type === "RESIZE_TEXT") {
    const text = penpot.selection[0];
    text.resize(message.content.newWidth, text.height);
  }
});
