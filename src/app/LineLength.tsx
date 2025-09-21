import { Text } from "@penpot/plugin-types";
import React from "react";
import ResizeForm from "./ResizeForm";
import { ITextData } from "../model";
import autoHeightImage from "../assets/auto-height.webp";

interface Props {
  selectedText: Text | null;
}

const getNbLine = (textShape: Text): number => {
  if (textShape.growType !== "auto-height") return 0;
  const heightLine = Math.ceil(
    parseInt(textShape.fontSize) * parseFloat(textShape.lineHeight)
  );
  return Math.round(textShape.height / heightLine);
};

const getAverageCharPerLine = (textShape: Text, lineNumber: number) => {
  return Math.round(textShape.characters.length / lineNumber);
};

const createTextData = (selectedText: Text | null): ITextData | null => {
  if (!selectedText) return null;
  const lineNumber = getNbLine(selectedText);
  return {
    shape: selectedText,
    averageCharPerLine: getAverageCharPerLine(selectedText, lineNumber),
    lineNumber: lineNumber,
  };
};

const LineLength: React.FC<Props> = ({ selectedText }) => {
  const textData: ITextData | null = createTextData(selectedText);

  return (
    <div>
      {" "}
      <p className="font-bold mb-2">
        {selectedText ? (
          <>
            {selectedText.growType !== "auto-height" ? (
              <>
                Need to enable auto-height property
                <img
                  src={autoHeightImage}
                  alt="Image to show where to enable auto-height property"
                />
              </>
            ) : (
              <>
                Current average character per line:{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {textData ? `${textData.averageCharPerLine}` : "0"}ch/line
                </span>
              </>
            )}
          </>
        ) : (
          <span className="text-[11px] italic">
            Select a single text layer to get its average line length with
            auto-height proprety
          </span>
        )}
      </p>
      <ResizeForm
        textData={selectedText?.growType === "auto-height" ? textData : null}
      />
    </div>
  );
};

export default LineLength;
