// components/HookProvider.tsx
"use client";

import { Fragment } from "react";
import useToken from "../hooks/useToken";

function HookProvider({ children }: { children: React.ReactNode }) {
  // const [loading, setLoading] = useState(true);

  useToken();

  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return <Fragment>{children}</Fragment>;
}

export default HookProvider;
