import React from "react";

interface TitleProps {
  questionID: number;
  name: string;
}

function Title({ questionID, name }: TitleProps) {
  switch (questionID) {
    // case 20:
    case 17:
    case 198:
      return <h2 className="font-semibold text-2xl mb-2">{name}</h2>;
    default:
      return null;
  }
}

export default Title;
