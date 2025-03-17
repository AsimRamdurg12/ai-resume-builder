"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const AnalysisPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { data: session } = useSession();

  const [id, setId] = useState("");

  console.log(session);

  useEffect(() => {
    (async () => {
      const _id = (await params).id;

      setId(_id);
    })();
  }, [params]);

  return <div>{id}</div>;
};

export default AnalysisPage;
