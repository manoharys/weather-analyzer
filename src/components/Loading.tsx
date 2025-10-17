import React from "react";

interface LoadingProps {
  message?: string;
  inline?: boolean;
  height?: number | string;
}

const Loading: React.FC<LoadingProps> = ({
  message = "Loading…",
  inline = false,
  height = 300,
}) => {
  if (inline) {
    return <span style={{ color: "black" }}>{message}</span>;
  }

  // ref - https://refine.dev/blog/react-svg/
  return (
    <div
      style={{
        height,
        color: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {message}
      <svg
        width='24'
        height='24'
        viewBox='0 0 50 50'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden
        focusable='false'
        style={{ marginLeft: 8 }}
      >
        <circle
          cx='25'
          cy='25'
          r='20'
          stroke='#e5e7eb'
          strokeWidth='4'
          fill='none'
        />
        <path
          d='M25 5 A20 20 0 0 1 45 25'
          stroke='#3b82f6'
          strokeWidth='4'
          strokeLinecap='round'
          fill='none'
        >
          <animateTransform
            attributeName='transform'
            type='rotate'
            from='0 25 25'
            to='360 25 25'
            dur='0.8s'
            repeatCount='indefinite'
          />
        </path>
      </svg>
    </div>
  );
};

export default Loading;
