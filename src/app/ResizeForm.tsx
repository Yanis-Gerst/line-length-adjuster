import React, { useState } from "react";
import { ITextData, ResizeTextPluginEvent } from "../model";

interface Props {
  textData: ITextData | null;
}

const calculateNewWidth = (
  textData: ITextData,
  targetAverageCharPerLine: number,
): number => {
  const averageCharacterWidth = 0.5 * parseInt(textData.shape.fontSize);
  return targetAverageCharPerLine * averageCharacterWidth;
};

const ResizeForm: React.FC<Props> = ({ textData }) => {
  const [resized, setResized] = useState<boolean>(false);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!textData) return;
    const target = e.target as typeof e.target & {
      charPerLine: { value: string };
    };
    const inputValue = parseInt(target.charPerLine.value);
    const newWidth = calculateNewWidth(textData, inputValue);
    const messageContent: ResizeTextPluginEvent = {
      type: "RESIZE_TEXT",
      content: {
        textShapeId: textData.shape.id,
        newWidth,
      },
    };

    parent.postMessage(messageContent, "*");
    setResized(true);
  };
  if (!textData) return null;
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col">
        {" "}
        <label className="mb-4 text-slate-600 dark:text-slate-400">
          Average number of characters per line:
          <input
            className="mt-2 flex px-4 py-2 border  border-slate-300 dark:border-slate-700 rounded-lg"
            type="number"
            name="charPerLine"
            placeholder="E.g 45"
          ></input>
        </label>
        <button
          className="bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-300 dark:bg-blue-400 text-slate-100 dark:text-slate-900 rounded-lg py-2 px-4  bold w-[120px] disabled:bg-gray-400 disabled:text-gray-50 disabled:dark:text-gray-900 disabled:pointer-events-none "
          type="submit"
          disabled={textData === null}
        >
          Resize
        </button>
      </form>
      {resized && <p>Resized to {textData?.lineNumber}px</p>}
    </>
  );
};

export default ResizeForm;
