import React from "react";

interface LoadingPlaceholderProps {
  rows?: number;
}

const LoadingPlaceholder = React.memo(
  ({ rows = 6 }: LoadingPlaceholderProps) => (
    <div
      className="mt-7 flex flex-col gap-6 items-center"
      aria-busy="true"
      aria-label="Loading form fields"
    >
      {[...Array(rows)].map((_, i) => (
        <React.Fragment key={i}>
          <div className="title-placeholder skeleton self-start" />
          <div className="input-placeholder skeleton" />
        </React.Fragment>
      ))}
    </div>
  )
);
LoadingPlaceholder.displayName = "LoadingPlaceholder";

export default LoadingPlaceholder;
