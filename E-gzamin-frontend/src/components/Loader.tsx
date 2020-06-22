import React, { ReactElement } from "react";
import Spinner from "react-loader-spinner";
import { useThemeMode } from "../contexts/ThemeModeContext";

const Loader = ({ size }: { size?: number }): ReactElement => {
  const { theme } = useThemeMode();

  return (
    <div style={{ margin: "auto" }}>
      <Spinner
        type="TailSpin"
        color={theme.palette.secondary.main}
        height={size || 150}
        width={size || 150}
      />
    </div>
  );
};

export default Loader;
