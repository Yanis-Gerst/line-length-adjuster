import React from "react";
import { ITextData, ResizeTextPluginEvent } from "../model";

interface Props {
  textData: ITextData | null;
}

const calculateNewWidth = (
  textData: ITextData,
  targetAverageCharPerLine: number
): number => {
  const charPerLine = Math.round(
    textData.averageCharPerLine / textData.lineNumber
  );
  const widthPerLine = textData.shape.width / textData.lineNumber;
  const diffInChars = targetAverageCharPerLine - textData.averageCharPerLine;
  const additionalLines = Math.ceil(diffInChars / charPerLine);

  return Math.round(textData.shape.width + additionalLines * widthPerLine);
};

const ResizeForm: React.FC<Props> = ({ textData }) => {
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
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {" "}
      <label className="mb-4 text-slate-600">
        Average number of characters per line:
        <input
          className="mt-2 flex px-4 py-2 border border-slate-300 rounded-lg"
          type="number"
          name="charPerLine"
          placeholder="E.g 45"
        ></input>
      </label>
      <button
        className="bg-blue-500 text-slate-100 rounded-lg py-2 px-4  bold w-[120px]"
        type="submit"
      >
        Resize
      </button>
    </form>
  );
};

export default ResizeForm;
