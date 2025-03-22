import { getResumesById } from "@/app/actions/resume.actions";
import DocumentViewer from "@/components/shared/DocumentViewer";
import { Button } from "@/components/ui/button";

const AnalysisPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const resume = await getResumesById(id);

  console.log(resume);

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 mx-4">
        <div className="">
          <DocumentViewer resume={resume} />
          <Button>Get Suggestions</Button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
