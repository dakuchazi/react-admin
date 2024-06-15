import { useState, useEffect } from "react";
import screenfull from "screenfull";
import { message, Tooltip } from "antd";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";

import "./index.scss";

const onClick = () => {
  if (!screenfull.isEnabled) {
    message.warning("you browser can not work");
    return false;
  }
  screenfull.toggle();
};

const FullScreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const change = () => {
    setIsFullscreen(screenfull.isFullscreen);
  };

  useEffect(() => {
    screenfull.isEnabled && screenfull.on("change", change);
    return () => {
      screenfull.isEnabled && screenfull.off("change", change);
    };
  }, []);

  const title = isFullscreen ? "取消全屏" : "全屏";
  return (
    <div className="fullScreen-container" onClick={onClick}>
      <Tooltip placement="bottom" title={title}>
        {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      </Tooltip>
    </div>
  );
};

export default FullScreen;
