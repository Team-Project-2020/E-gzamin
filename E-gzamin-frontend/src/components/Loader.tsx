import React, { ReactElement } from "react";
import Spinner from "react-loader-spinner";
import { useThemeMode } from "../contexts/ThemeModeContext";

const Loader = (): ReactElement => {
  const { theme } = useThemeMode();

  return (
    <div>
      <Spinner
        type="TailSpin"
        color={theme.palette.secondary.main}
        height={150}
        width={150}
      />
    </div>
  );
};

export default Loader;
