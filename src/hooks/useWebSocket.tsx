import { useEffect, useState, useRef, useCallback } from "react";
import { Ticker24hUpdate } from "../components/MarketList/types";
import { markets } from "../fixtures/markets";

const useWebSocket = (url: string) => {
  const [data, setData] = useState<Record<string, Ticker24hUpdate>>({});
  const wsConnection = useRef<WebSocket | null>(null);
  const retries = useRef(0);

  const connect = useCallback(() => {
    if (
      wsConnection.current &&
      (wsConnection.current.readyState === WebSocket.OPEN ||
        wsConnection.current.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    wsConnection.current = new WebSocket(url);

    wsConnection.current.onopen = () => {
      if (wsConnection.current?.readyState === WebSocket.OPEN) {
        wsConnection.current.send(
          JSON.stringify({
            action: "subscribe",
            channels: [{ name: "ticker24h", markets }],
          })
        );
      }
    };

    wsConnection.current.onmessage = (message) => {
      const messageData = JSON.parse(message.data);

      if (messageData.event === "ticker24h") {
        messageData.data.forEach((update: Ticker24hUpdate) => {
          setData((prevData) => ({
            ...prevData,
            [update.market]: update,
          }));
        });
      }
    };

    wsConnection.current.onerror = (errorEvent) => {
      console.error("WebSocket error:", errorEvent);
    };

    wsConnection.current.onclose = () => {
      if (document.hasFocus() && retries.current < 3) {
        console.log("Reconnecting...");
        retries.current += 1;
        connect();
      }
    };
  }, [url]);

  const disconnect = () => {
    if (
      wsConnection.current &&
      wsConnection.current.readyState === WebSocket.OPEN
    ) {
      wsConnection.current.close();
      wsConnection.current = null;
    }
  };

  useEffect(() => {
    connect();

    const handleWindowBlur = () => {
      setTimeout(() => {
        if (!document.hasFocus()) {
          disconnect();
        }
      }, 200);
    };

    const handleWindowFocus = () => {
      if (document.hasFocus()) {
        connect();
      }
    };

    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      disconnect();

      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [connect]);

  return { data };
};

export default useWebSocket;
