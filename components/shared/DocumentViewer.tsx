"use client";

import { IResume } from "@/models/ResumeModel";
import React, { useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

const DocumentViewer = ({ resume }: { resume: IResume }) => {
  const [data, setData] = useState(resume);

  const docs = [{ uri: data.fileUrl }];

  return (
    <div>
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        style={{
          height: 500,
          width: "auto",
          objectFit: "contain",
          overflow: "scroll",
        }}
      />
    </div>
  );
};

export default DocumentViewer;
