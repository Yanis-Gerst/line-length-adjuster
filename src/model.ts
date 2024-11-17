/**
 * This file contains the typescript interfaces for the plugin events.
 */

import { Text } from "@penpot/plugin-types";

export interface PluginMessageEvent<T> {
  type: PluginEventType;
  content: T;
}

export type PluginEventType =
  | "THEME_CHANGE"
  | "SELECTION_UPDATE"
  | "RESIZE_TEXT";

export interface TextResizeParams {
  textShapeId: string;
  newWidth: number;
}

export interface ITextData {
  shape: Text;
  averageCharPerLine: number;
  lineNumber: number;
}

// Todo: Type theme possibility
export type ThemePluginEvent = PluginMessageEvent<string>;

export type SelectionPluginEvent = PluginMessageEvent<Text | null>;

export type ResizeTextPluginEvent = PluginMessageEvent<TextResizeParams>;
